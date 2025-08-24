import React from 'react'
import './CustomerProfile.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'

const CustomerProfile = () => {

  const navigate = useNavigate()
  
  const handleBadgesClick = () => {
      navigate('/customer-badges')
  }
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
          <div className="profile-card-badges"onClick={handleBadgesClick}>나의 마패 모음집</div>
          <div className="profile-card-exchange" onClick={handleExchangeClick}>엽전 교환소</div>
          <div className="profile-card-point" onClick={handlePointClick}>
            나의 엽전 기록소<br/>
          </div>
          <div className="profile-card-record" onClick={handleRecordClick}>나의 마실 나눔 기록들 확인하기</div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
