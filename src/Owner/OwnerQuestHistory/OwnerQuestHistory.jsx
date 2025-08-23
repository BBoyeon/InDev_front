import React, { useEffect, useState } from 'react'
import AppHeader from '../OwnerAppHeader/OwnerAppHeader'
import './OwnerQuestHistory.css'

const OwnerQuestHistory = () => {
  const [completedRequests, setCompletedRequests] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('completedRequests')
    if (stored) {
      try {
        const arr = JSON.parse(stored)
        if (Array.isArray(arr)) setCompletedRequests(arr)
      } catch (_) {}
    }
  }, [])

  return (
    <div className="owner-quest-history">
      <AppHeader />
      <div className="history-container">
        <h1 className="history-title">완료된 의뢰 기록</h1>

        {completedRequests.length === 0 ? (
          <div className="history-empty">아직 완료된 의뢰가 없습니다.</div>
        ) : (
          <div className="history-list">
            {completedRequests.map((req) => (
              <div key={req.id} className="history-item">
                <div className="history-main">
                  <div className="history-title-text">{req.title}</div>
                  <div className="history-meta">요청자: {req.requester || '알 수 없음'}</div>
                </div>
                <span className="history-badge">완료</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerQuestHistory
