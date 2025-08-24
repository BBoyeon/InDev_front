// src/ShareMarket/ShareMarket.jsx
import React, { useEffect, useState } from 'react'
import './ShareMarket.css'
import axios from 'axios'

const BASE_URL = "https://indev-project.p-e.kr"

const ShareMarket = () => {
  const [title, setTitle] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  // 🔹 character id → 실제 이미지 src 매핑
  const characterList = {
    1: "/character/도깨비캐릭터.png",
    2: "/character/여자캐릭터.png",
    3: "/character/남자캐릭터.png",
    4: "/character/고양이캐릭터.png",
  }

  // 🔹 API에서 게시글 불러오기 + localStorage에서 사용자 정보 불러오기
  useEffect(() => {
    axios.get(`${BASE_URL}/post/`)
      .then(res => {
        console.log("불러온 게시글:", res.data)
        setPosts(res.data)
      })
      .catch(err => console.error("게시글 불러오기 실패:", err))

    const currentId = localStorage.getItem('currentCustomerId')
    const customers = JSON.parse(localStorage.getItem('customers') || '[]')
    const found = customers.find(c => String(c.id) === String(currentId))
    if (found) {
      setCurrentUser({
        id: found.id,
        name: found.nickname,
        character: characterList[found.character], // id → src 변환
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !neighborhood || !content) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    if (!currentUser) {
      alert('로그인한 사용자가 없습니다.')
      return
    }

    try {
      let formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("neighborhood", neighborhood)
      if (image) {
        formData.append("image", image)
      }

      const res = await axios.post(`${BASE_URL}/post/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      // 서버 응답에 name/character 없음 → 프론트에서 직접 붙임
      const newPost = {
        ...res.data,
        name: currentUser.name,
        character: currentUser.character,
        userId: currentUser.id
      }

      setPosts([newPost, ...posts])

      alert('공유 완료!')
      setTitle('')
      setNeighborhood('')
      setContent('')
      setImage(null)
    } catch (err) {
      console.error("게시글 작성 실패:", err)
      alert("게시글 작성 실패")
    }
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/post/${postId}/`)
      setPosts(posts.filter(p => p.post_id !== postId))
    } catch (err) {
      console.error("게시글 삭제 실패:", err)
      alert("삭제 실패")
    }
  }

  return (
    <div className="share-market">
      <div className="posts-section">
        <h2>마실 공유 피드</h2>
        {posts.map((post) => (
          <div className="post" key={post.post_id}>
            <div className="post-header">
              <img src={post.character || "/character/남자캐릭터.png"} alt="character" className="post-profile" />
              <span className="post-name">{post.name || "익명"}</span>
            </div>
            <h3>{post.title}</h3>
            <p className="post-location">{post.neighborhood}</p>
            <p className="post-content">{post.content}</p>
            {post.image && (
              <img
                src={`${BASE_URL}${post.image}`}
                alt="첨부 이미지"
                className="post-image"
              />
            )}

            {/* 🔹 내 글일 때만 삭제 버튼 */}
            {post.userId === currentUser?.id && (
              <button onClick={() => handleDelete(post.post_id)}>삭제</button>
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
