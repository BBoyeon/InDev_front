// src/Customer/CustomerOnboarding/CustomerOnboarding.jsx
import React, { useState } from 'react'
import './CustomerOnboarding.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const characterList = [
  { src: "/character/남자캐릭터.png", alt: "남자캐릭터" },
  { src: "/character/여자캐릭터.png", alt: "여자캐릭터" },
  { src: "/character/고양이캐릭터.png", alt: "고양이캐릭터" },
  { src: "/character/도깨비캐릭터.png", alt: "도깨비캐릭터" },
]

const CustomerOnboarding = () => {
  const [character, setCharacter] = useState(null)
  const [nickname, setNickname] = useState("")
  const [gender, setGender] = useState("")
  const [intro, setIntro] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!nickname || !intro || character === null || !gender) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post("https://indev-project.p-e.kr/customer/", {
        nickname,
        gender,
        intro,
        character: characterList[character].src,
      })

      console.log("신규 고객 생성:", response.data)

      // 대시보드 페이지로 이동하면서 응답 데이터 전달
      navigate(`/customer-dashboard/${response.data.customer_id}`)
    } catch (err) {
      console.error("고객 생성 실패:", err)
      setError("고객 생성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="customer-onboarding">
      <h1 className="customer-onboarding-title">~ 당신을 알려주시오 ~</h1>
      <h2 className="customer-onboarding-subtitle">원하는 모습을 선택해주시오!</h2>
      <div className="customer-onboarding-options">
        {characterList.map((char, idx) => (
          <img
            key={char.alt}
            src={char.src}
            alt={char.alt}
            className={character === idx ? "customer-onboarding-option selected" : "customer-onboarding-option"}
            onClick={() => setCharacter(idx)}
          />
        ))}
      </div>

      <div className="customer-onboarding-inputs">
        <div className="customer-onboarding-name-input-container">
          <p className='customer-onboarding-name'>이름 :</p>
          <input 
            type="text" 
            className="customer-onboarding-name-input" 
            placeholder="이름을 입력하세요"
            onChange={(e) => setNickname(e.target.value)} 
          />
        </div>

        <div className="customer-onboarding-gender-input-container">
          <p className='customer-onboarding-gender'>성별 :</p>
          <div className="gender-button-group">
            <button
              type="button"
              className={gender === 'male' ? 'gender-button selected' : 'gender-button'}
              onClick={() => setGender('male')}
            >
              남성
            </button>
            <button
              type="button"
              className={gender === 'female' ? 'gender-button selected' : 'gender-button'}
              onClick={() => setGender('female')}
            >
              여성
            </button>
          </div>
        </div>

        <div className="customer-onboarding-introduce-input-container">
          <p className='customer-onboarding-introduce'>한 줄 소개 :</p>
          <input 
            type="text" 
            className="customer-onboarding-introduce-input" 
            placeholder="한 줄 소개를 입력하세요"
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>
      </div>

      <button 
        onClick={handleLogin} 
        className="customer-onboarding-submit" 
        disabled={loading}
      >
        {loading ? "등록 중..." : "시작하겠소!"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default CustomerOnboarding
