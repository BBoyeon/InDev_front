import React from 'react'
import './CustomerProfile.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'

const CustomerProfile = () => {

  const navigate = useNavigate()
  
  /*const handleBadgeClick = () => {
      navigate('/customer-badge')
  }*/
  const handlePointClick = () => {
      navigate('/customer-point')
  }
  const handleExchangeClick = () => {
      navigate('/customer-exchange')
  }
    const handleRecordClick = () => {
        navigate('/customer-record')
    }


  return (
    <div className="customer-profile">
      <AppHeader />
      <div className="profile-underheader">
        <div className="profile-grid">
          <div className="profile-card-badge"/*onClick={handleBadgeClick}*/>나의 뱃지 확인하는 곳</div>
          <div className="profile-card-exchange" onClick={handleExchangeClick}>포인트 교환 페이지</div>
          <div className="profile-card-point" onClick={handlePointClick}>
            나의 포인트 확인하는 곳<br/>
            (밑에는 어떤 미션으로 얼마나 받았는지 확인할 수 있도록 함)
          </div>
          <div className="profile-card-record" onClick={handleRecordClick}>나의 마실 나눔 기록들 확인하기</div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
