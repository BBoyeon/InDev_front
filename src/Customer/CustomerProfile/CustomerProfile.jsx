import React from 'react'
import './CustomerProfile.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerProfile = () => {
  return (
    <div className="customer-profile">
      <AppHeader />
      <div className="profile-underheader">
        <div className="profile-grid">
          <div className="profile-card-badge">나의 뱃지 확인하는 곳</div>
          <div className="profile-card-exchange">포인트 교환 페이지</div>
          <div className="profile-card-point">
            나의 포인트 확인하는 곳<br/>
            (밑에는 어떤 미션으로 얼마나 받았는지 확인할 수 있도록 함)
          </div>
          <div className="profile-card-market">나의 마실 나눔 기록들 확인하기</div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
