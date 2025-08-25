// src/ShareMarket/ShareMarket.jsx
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
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

  const location = useLocation()

  // 고객 캐릭터 매핑 (id → 이미지 src)
  const customerCharacterList = {
    1: "/character/도깨비캐릭터.png",
    2: "/character/여자캐릭터.png",
    3: "/character/남자캐릭터.png",
    4: "/character/고양이캐릭터.png",
  }

  // 점주 캐릭터 매핑 (store_id → 이미지 src)
  const storeCharacterList = {
    5: "/store/주막.png",
    6: "/store/기와집.png",
    7: "/store/시장.png",
    8: "/store/책방.png",
  }

  // 점주 이름 매핑 (store_id → 이름)
  const storeNameList = {
    5: "주막",
    6: "기와집",
    7: "시장",
    8: "책방",
  }

  // 게시글 불러오기 + 사용자 정보 복원
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post/`)
        console.log("서버에서 불러온 게시글:", res.data)
        setPosts(res.data)
      } catch (err) {
        console.error("게시글 불러오기 실패:", err)
      }
    }

    fetchPosts()

    // URL 기반 역할 판별
    const pathname = location.pathname

    if (pathname.includes("owner")) {
      const store = localStorage.getItem("currentStore")
      if (store) {
        const parsed = JSON.parse(store)
        console.log("로컬 currentStore:", parsed)
        setCurrentUser({
          role: "store",
          id: Number(parsed.store_id),
          name: parsed.name,
          characterId: parsed.store_id,
        })
      }
    } else if (pathname.includes("customer")) {
      const customer = localStorage.getItem("currentCustomer")
      if (customer) {
        const parsed = JSON.parse(customer)
        console.log("로컬 currentCustomer:", parsed)
        setCurrentUser({
          role: "customer",
          id: Number(parsed.customer_id),
          name: parsed.nickname,
          characterId: parsed.character,
        })
      }
    } else {
      console.warn("URL에 owner/customer 키워드가 없음 → 사용자 role 판별 불가")
    }
  }, [location.pathname])

  // 게시글 작성
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

      if (currentUser.role === "customer") {
        formData.append("customer_id", currentUser.id)
      } else if (currentUser.role === "store") {
        formData.append("store_id", currentUser.id)
      }

      if (image) {
        formData.append("image", image)
      }

      console.log("게시글 작성 formData:", [...formData])

      const res = await axios.post(`${BASE_URL}/post/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setPosts([res.data, ...posts])
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
              {post.customer ? (
                // 고객 게시글
                <>
                  <img
                    src={customerCharacterList[post.customer_character] || "/character/남자캐릭터.png"}
                    alt="customer-character"
                    className="post-profile"
                  />
                  <span className="post-name">{post.customer_name}</span>
                </>
              ) : (
                // 점주 게시글
                <>
                  <img
                    src={storeCharacterList[post.store] || "/store/주막.png"}
                    alt="store-character"
                    className="post-profile"
                  />
                  <span className="post-name">{post.store_name || "가게"}</span>
                </>
              )}
            </div>

            <h3>{post.title}</h3>
            <p>{post.neighborhood}</p>
            <p>{post.content}</p>

            {post.image && (
              <img
                src={`${BASE_URL}${post.image}`}
                alt="게시글 이미지"
                className="post-image"
              />
            )}

            {/* 내 글만 삭제 가능 */}
            {(post.customer === currentUser?.id && currentUser?.role === "customer") ||
             (post.store === currentUser?.id && currentUser?.role === "store") ? (
              <button onClick={() => handleDelete(post.post_id)}>삭제</button>
            ) : null}
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
