// src/OwnerRecord/OwnerRecord.jsx
import React, { useEffect, useState } from 'react'
import './OwnerRecord.css'
import AppHeader from '../OwnerAppHeader/OwnerAppHeader'
import axios from 'axios'

const BASE_URL = "https://indev-project.p-e.kr"

const storeCharacterList = {
  5: "/store/주막.png",
  6: "/store/기와집.png",
  7: "/store/시장.png",
  8: "/store/책방.png",
}

const OwnerRecord = () => {
  const [myPosts, setMyPosts] = useState([])

  // 현재 로그인한 점주 ID (Onboarding에서 저장됨)
  const store = localStorage.getItem("currentStore")
  const currentStoreId = store ? JSON.parse(store).store_id : null

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!currentStoreId) return
      try {
        const res = await axios.get(`${BASE_URL}/post/`)
        // 서버 응답 normalize
        const normalized = res.data.map(p => ({
          ...p,
          store_id: p.store, // 서버 응답 필드명 통일
        }))
        // 내 글만 필터링
        const filtered = normalized.filter(p => p.store_id === currentStoreId)
        setMyPosts(filtered)
      } catch (err) {
        console.error("내 글 불러오기 실패:", err)
      }
    }

    fetchMyPosts()
  }, [currentStoreId])

  // 삭제 함수
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/post/${postId}/`)
      setMyPosts(myPosts.filter(p => p.post_id !== postId))
    } catch (err) {
      console.error("삭제 실패:", err)
    }
  }

  return (
    <div className='owner-record'>
      <AppHeader />
      <div className="under-header">
        <div className="owner-timeline">
          <h2>내가 작성한 마실 글</h2>

          {myPosts.length === 0 ? (
            <p className="no-posts">작성한 글이 없어요! 마실을 공유하러 가볼까요?</p>
          ) : (
            myPosts.map(post => (
              <div className="post" key={post.post_id}>
                <div className="post-header">
                  <img 
                    src={storeCharacterList[post.store_id] || "/store/주막.png"} 
                    alt="store-character" 
                    className="post-profile" 
                  />
                  <span className="post-name">{post.store_name}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.neighborhood}</p>
                <p className="post-content">{post.content}</p>
                {post.image && (
                  <img src={`${BASE_URL}${post.image}`} alt="첨부 이미지" className="post-image" />
                )}

                {/* 내 글일 때만 삭제 버튼 */}
                {post.store_id === currentStoreId && (
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

export default OwnerRecord
