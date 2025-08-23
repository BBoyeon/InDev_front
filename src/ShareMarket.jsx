import React, { useEffect, useState } from 'react'
import './ShareMarket.css'

const ShareMarket = () => {
  const [title, setTitle] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [posts, setPosts] = useState([])

  // 🔹 현재 사용자 정보 (Onboarding에서 localStorage에 저장된 값)
  const currentUser = {
    id: localStorage.getItem('id'),
    name: localStorage.getItem('name'),
    character: localStorage.getItem('character')
  }

  // 🔹 localStorage에서 초기 데이터 로드
  useEffect(() => {
    const storedPosts = localStorage.getItem('masilPosts')
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !neighborhood || !description || !image) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    const newPost = {
      id: Date.now(), // 글 고유 ID
      userId: currentUser.id, // 작성자 ID
      name: currentUser.name,
      character: currentUser.character,
      title,
      location: neighborhood,
      desc: description,
      image: URL.createObjectURL(image)
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('masilPosts', JSON.stringify(updatedPosts)) // 🔹 저장

    alert('공유 완료!')

    setTitle('')
    setNeighborhood('')
    setDescription('')
    setImage(null)
  }

  const handleDelete = (postId) => {
    const post = posts.find(p => p.id === postId)
    if (!post) return
    if (post.userId !== currentUser.id) {
      alert('본인이 작성한 게시물만 삭제할 수 있습니다.')
      return
    }
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    const updatedPosts = posts.filter(p => p.id !== postId)
    setPosts(updatedPosts)
    localStorage.setItem('masilPosts', JSON.stringify(updatedPosts))
  }

  return (
    <div className="share-market">
      <div className="posts-section">
        <h2>마실 공유 피드</h2>
        {posts.map((post) => (
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
            {post.userId === currentUser.id && (
              <button onClick={() => handleDelete(post.id)}>삭제</button>
            )}
          </div>
        ))}
      </div>

      <div className="share-section">
        <h2>나의 마실 공유하기</h2>
        <form onSubmit={handleSubmit} className="share-form">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="동네 정보"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <textarea
            placeholder="간단한 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">마실 공유하기</button>
        </form>
      </div>
    </div>
  )
}

export default ShareMarket
