// src/Customer/CustomerPoint/CustomerPoint.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CustomerPoint.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerPoint = () => {
  const [pointHistory, setPointHistory] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const fetchCompletedMissions = async () => {
      try {
        const customerId = localStorage.getItem("currentCustomerId")
        if (!customerId) {
          console.error("고객 ID가 없습니다. 로그인 또는 회원가입을 먼저 진행하세요.")
          return
        }

        const url = `https://indev-project.p-e.kr/mission/assign/${customerId}/`
        const res = await axios.get(url)

        // ✅ 완료된 미션만 필터링
        const completed = res.data.missions
          .filter(m => m.status === "COMPLETED")
          .map(m => ({
            id: m.id,
            title: m.owner_mission.title,
            amount: m.owner_mission.reward
          }))

        setPointHistory(completed)

        // ✅ 총 보상 합산
        const total = completed.reduce((acc, cur) => acc + cur.amount, 0)
        setTotalPoints(total)

      } catch (err) {
        console.error("포인트 내역 불러오기 실패:", err.response?.data || err.message)
      }
    }

    fetchCompletedMissions()
  }, [])

  return (
    <div className="customer-point">
      <AppHeader />
      <div className="point-outer">
        <div className="point-container">
          <h2 className="point-total">
            총 획득 엽전 : <span>{totalPoints}</span> 엽전
          </h2>
          <table className="point-table">
            <thead>
              <tr>
                <th>미션 내역</th>
                <th>획득 엽전</th>
              </tr>
            </thead>
            <tbody>
              {pointHistory.length > 0 ? (
                pointHistory.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.title}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">완료된 미션이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomerPoint
