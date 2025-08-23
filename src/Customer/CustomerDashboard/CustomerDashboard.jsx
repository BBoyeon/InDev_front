import React, { useEffect, useState } from 'react'
import './CustomerDashboard.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import StoreMap from '../../StoreMap/StoreMap'

const CustomerDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: '손님',
    gender: '남자',
    intro: '',
    profile: '/character/남자캐릭터.png',
  })

  // ✅ 예시 가게 데이터
  const stores = [
    {
      name: "마실 떡볶이",
      lat: 37.5665,
      lng: 126.9780,
      category: "분식",
      address: "서울 중구 세종대로 110"
    },
    {
      name: "옆집 분식",
      lat: 37.5675,
      lng: 126.9820,
      category: "분식",
      address: "서울 종로구 종로 1가"
    },
    {
      name: "단골 김밥",
      lat: 37.5640,
      lng: 126.9760,
      category: "김밥",
      address: "서울 중구 남대문로"
    }
  ]

  useEffect(() => {
    // ✅ Onboarding에서 저장한 키 그대로 불러오기
    const name = localStorage.getItem('name') || '손님'
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
            {userInfo.name} {userInfo.gender === 'female' || userInfo.gender === '여자' ? '낭자' : '도령'} ! <p>어서오시오 ~</p>
          </div>
          <p className="user-intro">{userInfo.intro}</p>
        </div>

        <div className="dashboard-map">
          <h3>내 주변 가게</h3>
          <StoreMap stores={stores} radiusKm={3} />
        </div>

        <div className="dashboard-banner">
          <img src="/ㅇ.png" alt="광고 배너 자리" className="banner-img" />
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
