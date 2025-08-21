// src/pages/CustomerQuest.jsx
import React, { useState, useEffect } from 'react'
import './CustomerQuest.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const questList = [
  '○○ 불닭발에서 튤립닭발 먹기',
  '△△ 떡볶이집에서 매운떡볶이 도전하기',
  '☆☆ 카페에서 민트초코 음료 마시기'
]

const CustomerQuest = () => {
  const [todayQuest, setTodayQuest] = useState('')
  const [ongoingQuests, setOngoingQuests] = useState([])

  useEffect(() => {
    const random = questList[Math.floor(Math.random() * questList.length)]
    setTodayQuest(random)
  }, [])

  const handleAccept = () => {
    setOngoingQuests([...ongoingQuests, todayQuest])
    setTodayQuest('')
  }

return (
  <div className="customer-quest">
    <AppHeader />
    <div className="customer-quest-underheader">
      
      <div className="customer-myquest">
        <h1 className="customer-myquest-title">오늘의 의뢰</h1>
        <p className="customer-myquest-description">
          "오늘 도전할 미션을 수락해보세요!"
        </p>

        <div className="customer-mission-list">
          {todayQuest ? (
            <div className="customer-mission-hanjul">
              {todayQuest}
              <button onClick={handleAccept} className="customer-accept-button">
                수락
              </button>
            </div>
          ) : (
            <div className="customer-mission-hanjul">오늘의 의뢰를 수락하셨습니다!</div>
          )}
        </div>
      </div>

      <div className="customer-nowquest">
        <h1 className="customer-nowquest-title">진행 중인 의뢰</h1>
        <div className="customer-mission-list">
          {ongoingQuests.length === 0 ? (
            <div className="customer-mission-hanjul">수락한 의뢰가 없습니다.</div>
          ) : (
            ongoingQuests.map((quest, idx) => (
              <div key={idx} className="customer-mission-hanjul">{quest}</div>
            ))
          )}
        </div>
      </div>

    </div>
  </div>
)

}

export default CustomerQuest
