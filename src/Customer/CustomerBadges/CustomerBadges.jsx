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
    { img: badge1, desc: '새싹 마실꾼 : 미션 첫 완료 시에 주어지는 마패입니다.', isUnlocked: false },
    { img: badge2, desc: '승진 관리 : 미션 10개 완료 시에 주어지는 마패입니다.', isUnlocked: false },
    { img: badge3, desc: '발 넓은 마실꾼 : 마실 기록을 20번 남겼을 시 주어지는 마패입니다.', isUnlocked: false },
    { img: badge4, desc: '마실 계의 임금님 : 엽전 10000개를 모았을 시에 주어지는 마패입니다.', isUnlocked: false }
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


