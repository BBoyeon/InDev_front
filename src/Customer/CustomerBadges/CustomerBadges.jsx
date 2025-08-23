import React from 'react'
import './CustomerBadges.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'
import badge1 from '/badges/뱃지1.png'
import badge2 from '/badges/뱃지2.png'
import badge3 from '/badges/뱃지3.png'
import badge4 from '/badges/뱃지4.png'

const CustomerBadges = () => {
  // 뱃지 조건 충족 여부 (API 연동 시 상태값 넣는 곳)

  const badgeStates = [
    { img: badge1, desc: '1번 뱃지 설명', isUnlocked: false },
    { img: badge2, desc: '2번 뱃지 설명', isUnlocked: false },
    { img: badge3, desc: '3번 뱃지 설명', isUnlocked: false },
    { img: badge4, desc: '4번 뱃지 설명', isUnlocked: false }
  ]

  return (
    <div className="customer-badges">
      <AppHeader />
      <div className="badge-wrapper-outer">
        <div className="badge-section">
          <div className="badge-container">
            {badgeStates.map((badge, i) => (
              <div key={i} className="badge-wrapper">
                <img
                  src={badge.img}
                  alt={`badge-${i}`}
                  className={`badge-img ${badge.isUnlocked ? '' : 'locked'}`}
                />
                <div className="badge-tooltip">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



export default CustomerBadges


