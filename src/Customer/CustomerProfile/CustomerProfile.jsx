import React from 'react'
import './CustomerProfile.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'

const CustomerProfile = () => {
  const navigate = useNavigate()
  
  const handleBadgesClick = () => {
    const id = localStorage.getItem("currentCustomerId")
    if (id) {
      navigate(`/customer-badges/${id}`)
    } else {
      navigate('/customer-badges') // fallback
    }
  }

  const handlePointClick = () => {
    const id = localStorage.getItem("currentCustomerId")
    if (id) {
      navigate(`/customer-point/${id}`)
    } else {
      navigate('/customer-point') // fallback
    }
  }

  const handleExchangeClick = () => {
    const id = localStorage.getItem("currentCustomerId")
    if (id) {
      navigate(`/customer-exchange/${id}`)
    } else {
      navigate('/customer-exchange') // fallback
    }
  }

  const handleRecordClick = () => {
    const id = localStorage.getItem("currentCustomerId")
    if (id) {
      navigate(`/customer-record/${id}`)
    } else {
      navigate('/customer-record') // fallback
    }
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
