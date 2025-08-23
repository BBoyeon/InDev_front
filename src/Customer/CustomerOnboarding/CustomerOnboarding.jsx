import React, { useState } from 'react'
import './CustomerOnboarding.css'
import CustomerDashboard from "../CustomerDashboard/CustomerDashboard";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const characterList = [
  { src: "/character/남자캐릭터.png", alt: "남자캐릭터" },
  { src: "/character/여자캐릭터.png", alt: "여자캐릭터" },
  { src: "/character/고양이캐릭터.png", alt: "고양이캐릭터" },
  { src: "/character/도깨비캐릭터.png", alt: "도깨비캐릭터" },
]

const CustomerOnboarding = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [name, setName] = useState("");
  const [gender, setGender] = useState("")
  const [introduce, setIntroduce] = useState("");
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!name || !introduce || selectedIdx === null || !gender) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    // ✅ 사용자 고유 id 생성 (한 번만 생성되도록 Date.now 사용)
    const userId = Date.now().toString()

    localStorage.setItem('id', userId)
    localStorage.setItem('name', name)
    localStorage.setItem('introduce', introduce)
    localStorage.setItem('gender', gender)
    localStorage.setItem('character', characterList[selectedIdx].src)

    navigate('/customer-dashboard')
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
            className={selectedIdx === idx ? "customer-onboarding-option selected" : "customer-onboarding-option"}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>

      <div className="customer-onboarding-inputs">
        <div className="customer-onboarding-name-input-container">
          <p className='customer-onboarding-name'>이름  : </p>
          <input 
            type="text" 
            className="customer-onboarding-name-input" 
            placeholder="이름을 입력하세요"
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="customer-onboarding-gender-input-container">
          <p className='customer-onboarding-gender'>성별  : </p>
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
          <p className='customer-onboarding-introduce'>한 줄 소개  : </p>
          <input 
            type="text" 
            className="customer-onboarding-introduce-input" 
            placeholder="한 줄 소개를 입력하세요"
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleLogin} className="customer-onboarding-submit">
        시작하겠소!
      </button>
    </div>
  )
}

export default CustomerOnboarding
