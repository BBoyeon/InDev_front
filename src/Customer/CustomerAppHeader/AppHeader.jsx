import React from 'react'
import './AppHeader.css'
import { useNavigate } from 'react-router-dom'

const AppHeader = ({ activeMenu }) => {
  const navigate = useNavigate()
  const handleQuestClick = () => {
      navigate('/customer-quest')
  }
  const handleMarketClick = () => {
      navigate('/customer-market')
  }
  const handleProfileClick = () => {
      navigate('/customer-profile')
  }
    const handleDashboardClick = () => {
        navigate('/customer-dashboard')
    }

  return (
    <div className="app-header">
      <img src="/마실 손님ver.png" alt="Logo" className='appheader-logo' onClick={handleDashboardClick}/>
      <div className="appheader-menu">
        <p className={activeMenu === 'quest' ? 'active' : ''} onClick={handleQuestClick}>오늘의 의뢰</p>
        <p className={activeMenu === 'market' ? 'active' : ''} onClick={handleMarketClick}>마실 나눔 장터</p>
        <p className={activeMenu === 'profile' ? 'active' : ''} onClick={handleProfileClick}>나의 현황</p>
      </div>
    </div>
  )
}

export default AppHeader
