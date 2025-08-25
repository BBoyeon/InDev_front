import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CustomerQuest.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerQuest = () => {
  const [todayQuests, setTodayQuests] = useState([]) 
  const [ongoingQuests, setOngoingQuests] = useState([])
  const [selectedQuest, setSelectedQuest] = useState(null)

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const customerId = localStorage.getItem("currentCustomerId")
        if (!customerId) {
          console.error("고객 ID가 없습니다. 로그인 또는 회원가입을 먼저 진행하세요.")
          return
        }

        const url = `https://indev-project.p-e.kr/mission/assign/${customerId}/`
        const res = await axios.get(url)

        const assigned = []
        const ing = []

        res.data.missions.forEach(m => {
          const quest = {
            id: m.owner_mission.id,       // owner mission id
            assignId: m.id,               // assign id도 저장
            title: m.owner_mission.title,
            content: m.owner_mission.content,
            reward: m.owner_mission.reward,
            status: m.status
          }
          if (m.status === 'ASSIGNED') assigned.push(quest)
          if (m.status === 'ING') ing.push(quest)
        })

        // 오늘의 의뢰는 랜덤 3개만
        const shuffled = assigned.sort(() => 0.5 - Math.random())
        const randomThree = shuffled.slice(0, 3)

        setTodayQuests(randomThree)
        setOngoingQuests(ing)
      } catch (err) {
        console.error("퀘스트 불러오기 실패:", err.response?.data || err.message)
      }
    }

    fetchQuests()
  }, [])

  const handleAccept = async (quest) => {
    try {
      const customerId = localStorage.getItem("currentCustomerId")
      if (!customerId) {
        alert("고객 ID가 없습니다. 로그인 또는 회원가입을 먼저 진행하세요.")
        return
      }

      // ✅ API 요청
      const url = `https://indev-project.p-e.kr/mission/assign/${customerId}/start/${quest.id}/`
      await axios.post(url)

      // ✅ 성공 시 상태 업데이트
      const reassigned = ongoingQuests.map(q => ({ ...q, status: 'ASSIGNED' }))
      const newlyAccepted = { ...quest, status: 'ING' }

      const updatedToday = [
        ...todayQuests.filter(q => q.id !== quest.id),
        ...reassigned
      ]
      const updatedOngoing = [newlyAccepted]

      setTodayQuests(updatedToday)
      setOngoingQuests(updatedOngoing)

      // ✅ 로컬스토리지에도 저장
      localStorage.setItem("todayQuests", JSON.stringify(updatedToday))
      localStorage.setItem("ongoingQuests", JSON.stringify(updatedOngoing))

      console.log("미션 수락 성공:", quest.title)
    } catch (err) {
      console.error("미션 수락 실패:", err.response?.data || err.message)
      alert("미션 수락에 실패했습니다. 다시 시도해주세요.")
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
            {todayQuests.length > 0 ? (
              todayQuests.map((quest) => (
                <div key={quest.id} className="customer-mission-hanjul-today">
                  <button 
                    className="mission-title-button" 
                    onClick={() => setSelectedQuest(quest)}
                  >
                    {quest.title}
                  </button>
                  <button 
                    onClick={() => handleAccept(quest)} 
                    className="customer-accept-button"
                  >
                    수락
                  </button>
                </div>
              ))
            ) : (
              <div className="customer-mission-hanjul-today">
                오늘의 의뢰가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 나의 도전 의뢰 */}
        <div className="customer-nowquest">
          <h1 className="customer-nowquest-title">나의 도전 의뢰</h1>
          <div className="customer-mission-list">
            {ongoingQuests.length === 0 ? (
              <div className="customer-mission-hanjul-ongoing">
                수락한 의뢰가 없습니다.
              </div>
            ) : (
              ongoingQuests.map((quest, idx) => (
                <div key={idx} className="customer-mission-hanjul-ongoing">
                  <div>
                    <strong>의뢰 제목 : {quest.title}</strong>
                    <p>내용 : {quest.content}</p>
                    <p>보상 : {quest.reward}</p>
                  </div>
                  <span className="quest-status ongoing">{quest.status}</span>
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
