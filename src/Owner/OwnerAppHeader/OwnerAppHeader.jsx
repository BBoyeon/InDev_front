import React from 'react'
import './OwnerAppHeader.css'
import { useNavigate } from 'react-router-dom'

const OwnerAppHeader = ({ activeMenu }) => {
  const navigate = useNavigate()
  const handleQuestClick = () => {
      navigate('/owner-quest')
  }
  const handleMarketClick = () => {
      navigate('/owner-market')
  }
  const handleProfileClick = () => {
      navigate('/owner-profile')
  }
    const handleDashboardClick = () => {
        navigate('/owner-dashboard')
    }

  return (
    <div className="app-header">
      <img src="/마실 점주ver.png" alt="Logo" className='appheader-logo' onClick={handleDashboardClick}/>
      <div className="appheader-menu">
        <p className={activeMenu === 'quest' ? 'active' : ''} onClick={handleQuestClick}>요청된 의뢰</p>
        <p className={activeMenu === 'market' ? 'active' : ''} onClick={handleMarketClick}>마실 나눔 장터</p>
        <p className={activeMenu === 'profile' ? 'active' : ''} onClick={handleProfileClick}>주막 현황</p>
      </div>
    </div>
  )
}

export default OwnerAppHeader
