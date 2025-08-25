import React, { useEffect, useState } from 'react'
import './CustomerRecord.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import axios from 'axios'

const BASE_URL = "https://indev-project.p-e.kr"

const characterList = {
  1: "/character/도깨비캐릭터.png",
  2: "/character/여자캐릭터.png",
  3: "/character/남자캐릭터.png",
  4: "/character/고양이캐릭터.png",
}

const CustomerRecord = () => {
  const [myPosts, setMyPosts] = useState([])
  const currentUserId = Number(localStorage.getItem('currentCustomerId'))  //숫자로 통일

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!currentUserId) return
      try {
        const res = await axios.get(`${BASE_URL}/post/`)
        //서버 응답 normalize
        const normalized = res.data.map(p => ({
          ...p,
          customer_id: p.customer, // 서버 응답 필드 → 프론트 통일
        }))
        //내 글만 필터링
        const filtered = normalized.filter(p => p.customer_id === currentUserId)
        setMyPosts(filtered)
      } catch (err) {
        console.error("내 글 불러오기 실패:", err)
      }
    }

    fetchMyPosts()
  }, [currentUserId])

  //삭제 함수
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/post/${postId}/`)
      setMyPosts(myPosts.filter(p => p.post_id !== postId))
    } catch (err) {
      console.error("삭제 실패:", err)
    }
  }

  return (
    <div className='customer-record'>
      <AppHeader />
      <div className="under-header">
        <div className="customer-timeline">
          <h2>내가 작성한 마실 글</h2>

          {myPosts.length === 0 ? (
            <p className="no-posts">작성한 글이 없어요! 마실을 공유하러 가볼까요?</p>
          ) : (
            myPosts.map(post => (
              <div className="post" key={post.post_id}>
                <div className="post-header">
                  {/*characterList 매핑 사용 */}
                  <img 
                    src={characterList[post.customer_character] || "/character/남자캐릭터.png"} 
                    alt="character" 
                    className="post-profile" 
                  />
                  <span className="post-name">{post.customer_name}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>
                {post.image && (
                  <img src={`${BASE_URL}${post.image}`} alt="첨부 이미지" className="post-image" />
                )}

                {/*내 글일 때만 삭제 버튼*/}
                {post.customer_id === currentUserId && (
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(post.post_id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerRecord
