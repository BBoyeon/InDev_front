// src/pages/CustomerDashboard.jsx
import React, { useEffect, useState } from 'react'
import './CustomerDashboard.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: '손님',
    gender: '남자',
    intro: '',
    profile: '/character/남자캐릭터.png',
  })

  useEffect(() => {
    const name = localStorage.getItem('nickname') || '손님'
    const gender = localStorage.getItem('gender') || '남자'
    const intro = localStorage.getItem('introduce') || ''
    const profile = localStorage.getItem('character') || '/character/남자캐릭터.png'
    setUserInfo({ name, gender, intro, profile })
  }, [])

  return (
    <div className="customer-dashboard">
      <AppHeader/>
      <div className="dashboard-container">
        <div className="dashboard-userinfo">
          <img src={userInfo.profile} alt="프로필" className="profile-img" />
          <div className="user-greeting">
            {userInfo.name} {userInfo.gender === '여자' ? '낭자' : '도령'} ! <p>어서오시오 ~</p>
          </div>
          <p className="user-intro">{userInfo.intro}</p>
        </div>

        <div className="dashboard-map">
          <div className="map-placeholder">지도 영역 (추후 GPS 적용)</div>
        </div>

        <div className="dashboard-banner">
          <img src="/ㅇ.png" alt="광고 배너 자리" className="banner-img" />
        </div>

      </div>
    </div>
  )
}

export default CustomerDashboard
