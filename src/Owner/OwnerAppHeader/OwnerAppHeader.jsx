import React from 'react'
import './OwnerAppHeader.css'
import { useNavigate } from 'react-router-dom'

const OwnerAppHeader = ({ activeMenu }) => {
  const navigate = useNavigate()
  const handleQuestClick = () => {
      navigate('/owner-quest')
  }
  const handleMarketClick = () => {
      navigate('/customer-market')
  }
  const handleProfileClick = () => {
      navigate('/owner-profile')
  }
    const handleDashboardClick = () => {
        navigate('/owner-dashboard')
    }

  return (
    <div className="app-header">
      <img src="/3263780b-ad49-4e25-ac0d-ad76e00f35a7-removebg-preview.png" alt="Logo" className='appheader-logo' onClick={handleDashboardClick}/>
      <div className="appheader-menu">
        <p className={activeMenu === 'quest' ? 'active' : ''} onClick={handleQuestClick}>요청된 의뢰</p>
        <p className={activeMenu === 'market' ? 'active' : ''} onClick={handleMarketClick}>마실 나눔 장터</p>
        <p className={activeMenu === 'profile' ? 'active' : ''} onClick={handleProfileClick}>주막 현황</p>
      </div>
    </div>
  )
}

export default OwnerAppHeader
