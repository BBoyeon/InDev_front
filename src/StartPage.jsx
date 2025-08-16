import React from 'react'
import './StartPage.css'
import { useNavigate } from 'react-router-dom'
import RoleChoice from './RoleChoice'

const StartPage = () => {
  const navigate = useNavigate()
  const handleStartClick = () => {
    // Navigate to the RoleChoice component when the button is clicked
    navigate('/role-choice')
  }
  return (
    <div className="start-page">
      <img src="/3263780b-ad49-4e25-ac0d-ad76e00f35a7-removebg-preview.png" alt="Logo" className="logo" />
      <h1 className="start-page-title">오늘도 동네 한 바퀴 돌아보겠소?</h1>
      <button onClick={handleStartClick} className="start-page-button">시작하기</button>
    </div>
  )
}

export default StartPage
