import React, { useState } from 'react'
import './OwnerOnboarding.css'
import { useNavigate } from 'react-router-dom'


const characterList = [
  { src: "/store/주막.png", alt: "주막" },
  { src: "/store/기와집.png", alt: "기와집" },
  { src: "/store/시장.png", alt: "시장" },
  { src: "/store/책방.png", alt: "책방" },
]

const OwnerOnboarding = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = () => {
        // Handle the submission logic here, e.g., save the selected character and user info
        // For now, just navigate to the CustomerDashboard
        navigate('/Owner-dashboard')
    }

  return (
    <div className="Owner-onboarding">
      <h1 className="Owner-onboarding-title">~ 당신의 업장을 알려주시오 ~</h1>
      <h2 className="Owner-onboarding-subtitle">원하는 모습을 선택해주시오!</h2>
      <div className="Owner-onboarding-options">
        {characterList.map((char, idx) => (
          <img
            key={char.alt}
            src={char.src}
            alt={char.alt}
            className={selectedIdx === idx ? "Owner-onboarding-option selected" : "Owner-onboarding-option"}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>

      <div className="Owner-onboarding-inputs">
        <div className="Owner-onboarding-name-input-container">
            <p className='Owner-onboarding-name'>가게 이름:</p>
            <input type="text" className    ="Owner-onboarding-name-input" placeholder="이름을 입력하세요" />
        </div>
        <div className="Owner-onboarding-introduce-input-container">
            <p className='Owner-onboarding-introduce'>한줄소개:</p>
            <input type="text" className="Owner-onboarding-introduce-input" placeholder="한줄소개를 입력하세요" />
        </div>
      </div>

        <button onClick={handleSubmit} className="Owner-onboarding-submit">시작하겠소!</button>
    </div>
  )
}

export default OwnerOnboarding
