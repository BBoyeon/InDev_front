// src/Owner/OwnerDashboard/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react'
import './OwnerDashboard.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import StoreMap from '../../StoreMap/StoreMap'

const OwnerDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: '손님',
    profile: '/store/기와집.png',
    intro: '안녕하세요! 여기는 당신의 가게입니다.',
  })

  // 데모: 가게 리스트 (id, name, lat, lng, category, address)
  // => 실제 데이터로 대체하면 됨
  const [stores, setStores] = useState([
    { id: 1, name: '한옥 카페', lat: 37.5651, lng: 126.9785, category: '카페', address: '서울 중구 을지로' },
    { id: 2, name: '단골 분식', lat: 37.5668, lng: 126.9822, category: '분식', address: '서울 중구 충무로' },
    { id: 3, name: '마실 주막', lat: 37.5635, lng: 126.9760, category: '주점', address: '서울 중구 덕수궁로' },
  ])

  useEffect(() => {
    const name = localStorage.getItem('storename') || '손님'
    const intro = localStorage.getItem('introduce') || '안녕하세요! 여기는 당신의 가게입니다.'
    const profile = localStorage.getItem('character') || '/character/남자캐릭터.png'
    setUserInfo({ name, intro, profile })

    // 예: 로컬스토리지/백엔드에서 가게 목록 읽어오는 자리
    // const saved = localStorage.getItem('stores')
    // if (saved) setStores(JSON.parse(saved))
  }, [])

  return (
    <div className='owner-dashboard'>
      <OwnerAppHeader />

      <div className="dashboard-container">
        {/* 가게 프로필 카드 */}
        <div className="dashboard-userinfo">
          <img src={userInfo.profile} alt="프로필" className="profile-img" />
          <div className="user-greeting">
            {userInfo.name}! <p>어서오시오 ~</p>
          </div>
          <p className="user-intro">{userInfo.intro}</p>
          <button className="btn-edit" onClick={() => alert('프로필 수정은 추후 구현 예정')}>
            프로필 수정
          </button>
        </div>

        {/* 지도 섹션 */}
        <div className="dashboard-map">
          <h3 className="section-title">내 주변 가게</h3>
          <StoreMap stores={stores} radiusKm={3} />
        </div>

        {/* 배너/홍보 섹션 (AI 전단지 등) */}
        <div className="dashboard-banner">
          <div className="banner-card">
            <div>
              <div className="banner-title">AI 전단지 생성</div>
              <div className="banner-desc">조선 감성 그대로, AI로 빠르게 전단지 제작</div>
            </div>
            <button className="banner-btn" onClick={() => alert('AI 전단지 생성 기능은 추후 구현 예정')}>
              만들러 가기
            </button>
          </div>
          <img src="/ㅇ.png" alt="광고 배너 자리" className="banner-img" />
        </div>

        {/* 장식 요소 */}
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-1" />
        <img src="/decorate/기와요소.png" alt="기와그림" className="owner-deco-2" />
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-3" />
        <img src="/decorate/구름요소2.png" alt="구름요소2" className="owner-deco-4" />
      </div>
    </div>
  )
}

export default OwnerDashboard
