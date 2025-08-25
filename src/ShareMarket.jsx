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

  // 캐릭터 id → 이미지 매핑
  const characterList = {
    1: "/character/도깨비캐릭터.png",
    2: "/character/여자캐릭터.png",
    3: "/character/남자캐릭터.png",
    4: "/character/고양이캐릭터.png",
  }

  // 게시글 불러오기 + 사용자 정보 복원
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post/`)
        console.log("서버에서 불러온 게시글:", res.data)

        // 서버 응답(customer) → 프론트 기대(customer_id) 로 normalize
        const normalized = res.data.map(p => ({
          ...p,
          customer_id: p.customer,  // 서버에서 customer(pk)만 주니까 customer_id로 맞춰줌
        }))

        setPosts(normalized)
      } catch (err) {
        console.error("게시글 불러오기 실패:", err)
      }
    }

    fetchPosts()

    // 로컬스토리지에서 사용자 정보 복원
    const customerId = localStorage.getItem("currentCustomerId")
    const customer = localStorage.getItem("currentCustomer")
    if (customerId && customer) {
      const parsed = JSON.parse(customer)
      console.log("로컬 currentUser:", parsed)
      setCurrentUser({
        id: Number(parsed.customer_id),   // 숫자로 변환 (타입 불일치 방지)
        name: parsed.nickname,
        character: characterList[parsed.character],
        characterId: parsed.character,
      })
    } else {
      console.warn("로컬스토리지에 고객 정보가 없음")
    }
  }, [])

  // 게시글 작성 (FormData 사용)
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
      formData.append("customer_id", currentUser.id)
      if (image) {
        formData.append("image", image)  // ✅ 파일 객체 추가
      }

      console.log("게시글 작성 formData:", [...formData])

      const res = await axios.post(`${BASE_URL}/post/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const newPost = {
        ...res.data,
        customer_name: currentUser.name,
        customer_id: currentUser.id,            // 새 글도 동일하게 customer_id 보장
        customer_character: currentUser.characterId,
      }

      setPosts([newPost, ...posts])

      alert('공유 완료!')
      setTitle('')
      setNeighborhood('')
      setContent('')
      setImage(null)
    } catch (err) {
      console.error("게시글 작성 실패:", err.response?.data || err)
      alert("게시글 작성 실패")
    }
  }

  // 게시글 삭제
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
          <div key={post.post_id} className="post">
            <div className="post-header">
              <img
                src={characterList[post.customer_character] || "/character/남자캐릭터.png"}
                alt="character"
                className="post-profile"
              />
              <span className="post-name">{post.customer_name}</span>
            </div>

            <h3>{post.title}</h3>
            <p>{post.neighborhood}</p>
            <p>{post.content}</p>

            {/* ✅ 이미지 표시 */}
            {post.image && (
              <img
                src={`${BASE_URL}${post.image}`}
                alt="게시글 이미지"
                className="post-image"
              />
            )}

            {/* ✅ 내 글일 때만 삭제 버튼 */}
            {post.customer_id === currentUser?.id && (
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
