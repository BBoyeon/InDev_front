import React, { useState } from 'react'
import './CustomerOnboarding.css'
import CustomerDashboard from './CustomerDashboard'
import { useNavigate } from 'react-router-dom'


const characterList = [
  { src: "/character/남자캐릭터.png", alt: "남자캐릭터" },
  { src: "/character/여자캐릭터.png", alt: "여자캐릭터" },
  { src: "/character/고양이캐릭터.png", alt: "고양이캐릭터" },
  { src: "/character/도깨비캐릭터.png", alt: "도깨비캐릭터" },
]

const CustomerOnboarding = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = () => {
        // Handle the submission logic here, e.g., save the selected character and user info
        // For now, just navigate to the CustomerDashboard
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
            <p className='customer-onboarding-name'>이름:</p>
            <input type="text" className    ="customer-onboarding-name-input" placeholder="이름을 입력하세요" />
        </div>
        <div className="customer-onboarding-introduce-input-container">
            <p className='customer-onboarding-introduce'>한줄소개:</p>
            <input type="text" className="customer-onboarding-introduce-input" placeholder="한줄소개를 입력하세요" />
        </div>
      </div>

        <button onClick={handleSubmit} className="customer-onboarding-submit">시작하겠소!</button>
    </div>
  )
}

export default CustomerOnboarding
