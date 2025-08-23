// src/Customer/CustomerOnboarding/CustomerOnboarding.jsx
import React, { useState } from 'react'
import './CustomerOnboarding.css'
import { useNavigate } from 'react-router-dom'

const characterList = [
  { id: 3, src: "/character/남자캐릭터.png", alt: "남자캐릭터" },
  { id: 2, src: "/character/여자캐릭터.png", alt: "여자캐릭터" },
  { id: 4, src: "/character/고양이캐릭터.png", alt: "고양이캐릭터" },
  { id: 1, src: "/character/도깨비캐릭터.png", alt: "도깨비캐릭터" },
]

const CustomerOnboarding = () => {
  const [character, setCharacter] = useState(null)
  const [nickname, setNickname] = useState("")
  const [gender, setGender] = useState("")
  const [intro, setIntro] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!nickname.trim() || !intro.trim() || character === null || !gender) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    setLoading(true)
    setError(null)

    const payload = {
      nickname: nickname.trim(),
      gender,
      intro: intro.trim(),
      character: characterList[character].id,
    }
    console.log("저장하는 payload:", payload)

    try {
      const existingCustomers = JSON.parse(localStorage.getItem('customers')) || []
      const newCustomer = { ...payload, id: Date.now() }
      existingCustomers.push(newCustomer)
      localStorage.setItem('customers', JSON.stringify(existingCustomers))

      // 현재 로그인한 고객 ID 따로 저장해서 새로고침/이동 시 유지되도록 함
      localStorage.setItem('currentCustomerId', newCustomer.id)

      navigate(`/customer-dashboard/${newCustomer.id}`)
    } catch (err) {
      console.error("고객 저장 실패:", err)
      setError(`고객 저장 실패: ${err.message}`)
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} 
          />
        </div>

        <div className="customer-onboarding-gender-input-container">
          <p className='customer-onboarding-gender'>성별 :</p>
          <div className="gender-button-group">
            <button
              type="button"
              className={gender === 'M' ? 'gender-button selected' : 'gender-button'}
              onClick={() => setGender('M')}
            >
              남성
            </button>
            <button
              type="button"
              className={gender === 'F' ? 'gender-button selected' : 'gender-button'}
              onClick={() => setGender('F')}
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
            value={intro}
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
