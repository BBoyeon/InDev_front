import React from 'react'
import './StartPage.css'
import { useNavigate } from 'react-router-dom'
import RoleChoice from './RoleChoice'

const DecoList = [
  { src: "/decorate/기와요소.png", alt: "기와그림" },
  { src: "/decorate/초가집요소.png", alt: "초가집그림" },
  { src: "/decorate/구름요소.png", alt: "구름그림" },
  { src: "/decorate/산요소.png", alt: "산그림" },
  { src: "/decorate/길요소.png", alt: "길그림" },
  { src: "/decorate/엽전요소.png", alt: "엽전그림" },
]

const StartPage = () => {
  const navigate = useNavigate()
  const handleStartClick = () => {
    navigate('/role-choice')
  }
  return (
    <div className="start-page">
      <div className="start-page-side-decoration">
        <img src="/decorate/구름요소.png" alt="구름그림" className="side-deco-left" />
        <img src="/decorate/길요소.png" alt="길그림" className="side-deco-right" />
      </div>

      <img src="/마실로고.png" alt="Logo" className="logo" />
      <h1 className="start-page-title">오늘도 동네 한 바퀴 돌아보겠소?</h1>
      <button onClick={handleStartClick} className="start-page-button">시작하기</button>
    </div>
  )
}



export default StartPage
