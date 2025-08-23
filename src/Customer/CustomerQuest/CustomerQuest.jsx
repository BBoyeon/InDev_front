import React, { useState, useEffect } from 'react'
import './CustomerQuest.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const questList = [
  { title: '○○ 불닭발에서 튤립닭발 먹기', content: '매운 튤립 닭발을 먹고 인증샷 남기기', reward: '스탬프 1개' },
  { title: '△△ 떡볶이집에서 매운떡볶이 도전하기', content: '가장 매운 단계 도전 성공하기', reward: '음료 1개' },
  { title: '☆☆ 카페에서 민트초코 음료 마시기', content: '민트초코 라떼 사진 찍기', reward: '포인트 100점' }
]

const CustomerQuest = () => {
  const [todayQuest, setTodayQuest] = useState(null)
  const [ongoingQuests, setOngoingQuests] = useState([])
  const [selectedQuest, setSelectedQuest] = useState(null)

  useEffect(() => {
    const random = questList[Math.floor(Math.random() * questList.length)]
    setTodayQuest(random)
  }, [])

  const handleAccept = () => {
    if (todayQuest) {
      setOngoingQuests([...ongoingQuests, { ...todayQuest, status: '진행 중' }])
      setTodayQuest(null)
    }
  }

  return (
    <div className="customer-quest">
      <AppHeader />
      <div className="customer-quest-underheader">
        
        {/* 오늘의 의뢰 */}
        <div className="customer-myquest">
          <h1 className="customer-myquest-title">오늘의 의뢰</h1>
          <p className="customer-myquest-description">
            "오늘 도전할 미션을 수락해보세요!"
          </p>

          <div className="customer-mission-list">
            {todayQuest ? (
              <div className="customer-mission-hanjul-today">
                <button 
                  className="mission-title-button" 
                  onClick={() => setSelectedQuest(todayQuest)}
                >
                  {todayQuest.title}
                </button>
                <button onClick={handleAccept} className="customer-accept-button">
                  수락
                </button>
              </div>
            ) : (
              <div className="customer-mission-hanjul-today">오늘의 의뢰를 수락하셨습니다!</div>
            )}
          </div>
        </div>

        {/* 진행 중인 의뢰 */}
        <div className="customer-nowquest">
          <h1 className="customer-nowquest-title">진행 중인 의뢰</h1>
          <div className="customer-mission-list">
            {ongoingQuests.length === 0 ? (
              <div className="customer-mission-hanjul-ongoing">수락한 의뢰가 없습니다.</div>
            ) : (
              ongoingQuests.map((quest, idx) => (
                <div key={idx} className="customer-mission-hanjul-ongoing">
                  <div>
                    <strong>의뢰 제목 : {quest.title}</strong>
                    <p>내용 : {quest.content}</p>
                    <p>보상 : {quest.reward}</p>
                  </div>
                  <span className={`quest-status ${quest.status === '완료' ? 'completed' : 'ongoing'}`}>
                    {quest.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedQuest && (
        <div className="modal-backdrop" onClick={() => setSelectedQuest(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedQuest.title}</h2>
              <button className="modal-close" onClick={() => setSelectedQuest(null)}>×</button>
            </div>

            <div className="mission-detail-body">
              <div className="mission-detail-row">
                <span className="mission-detail-label">내용</span>
                <p className="mission-detail-text">{selectedQuest.content}</p>
              </div>
              <div className="mission-detail-row">
                <span className="mission-detail-label">보상</span>
                <p className="mission-detail-text">{selectedQuest.reward}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default CustomerQuest
