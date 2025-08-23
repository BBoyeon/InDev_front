import React, { useEffect, useState } from 'react'
import './OwnerRecord.css'
import AppHeader  from '../OwnerAppHeader/OwnerAppHeader'


const OwnerRecord = () => {
  const [myPosts, setMyPosts] = useState([])

  // 현재 로그인 사용자 id (Onboarding에서 저장한 값)
  const currentUserId = localStorage.getItem('currentCustomerId')

  useEffect(() => {
    const stored = localStorage.getItem('masilPosts')
    if (stored && currentUserId) {
      const allPosts = JSON.parse(stored)
      // 🔹 본인 글만 필터링
      const filtered = allPosts.filter(p => String(p.userId) === String(currentUserId))
      setMyPosts(filtered)
    }
  }, [currentUserId])

  // 🔹 삭제 함수
  const handleDelete = (postId) => {
    const stored = localStorage.getItem('masilPosts')
    if (!stored) return
    const allPosts = JSON.parse(stored)
    const updatedAllPosts = allPosts.filter(p => p.id !== postId) // 전체에서 삭제
    const updatedMyPosts = updatedAllPosts.filter(p => String(p.userId) === String(currentUserId))

    setMyPosts(updatedMyPosts)
    localStorage.setItem('masilPosts', JSON.stringify(updatedAllPosts))
  }

  return (
    <div className='customer-record'>
      <AppHeader />
      <div className="customer-timeline">
        <h2>내가 작성한 마실 글</h2>

        {myPosts.length === 0 ? (
          <p className="no-posts">작성한 글이 없어요! 마실을 공유하러 가볼까요?</p>
        ) : (
          myPosts.map(post => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <img src={post.character} alt="character" className="post-profile" />
                <span className="post-name">{post.name}</span>
              </div>
              <h3>{post.title}</h3>
              <p className="post-location">{post.location}</p>
              <p className="post-desc">{post.desc}</p>
              {post.image && <img src={post.image} alt="첨부 이미지" className="post-image" />}

              {/* 🔹 내 글일 때만 삭제 버튼 */}
              {String(post.userId) === String(currentUserId) && (
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OwnerRecord
