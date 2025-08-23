import React, { useEffect, useState } from 'react'
import './CustomerRecord.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerRecord = () => {
  const [myPosts, setMyPosts] = useState([])

  // 현재 사용자 id
  const currentUserId = localStorage.getItem('id')

  useEffect(() => {
    const stored = localStorage.getItem('masilPosts')
    if (stored) {
      const allPosts = JSON.parse(stored)
      // 🔹 본인 글만 필터링
      const filtered = allPosts.filter(p => p.userId === currentUserId)
      setMyPosts(filtered)
    }
  }, [currentUserId])

  // 🔹 삭제 함수
  const handleDelete = (postId) => {
    const stored = localStorage.getItem('masilPosts')
    if (!stored) return
    const allPosts = JSON.parse(stored)
    const updatedAllPosts = allPosts.filter(p => p.id !== postId) // 전체에서 삭제
    const updatedMyPosts = updatedAllPosts.filter(p => p.userId === currentUserId)

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

            {/* 🔹 삭제 버튼 */}
            {post.userId === currentUserId && (
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

export default CustomerRecord
