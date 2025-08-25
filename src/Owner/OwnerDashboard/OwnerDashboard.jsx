// src/Owner/OwnerDashboard/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react'
import './OwnerDashboard.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import StoreMap from '../../StoreMap/StoreMap'
import axios from 'axios'

const OwnerDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [userInfo, setUserInfo] = useState({
    name: '',
    profile: '/store/기와집.png',
    intro: '',
    category: '',
    address: '',
    openDate: '',
  })

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true)
        setError('')

        // ✅ OwnerOnboarding에서 저장한 currentStore 불러오기
        const local = localStorage.getItem('currentStore')
        if (!local) {
          setError('가게 정보를 찾을 수 없어요. 온보딩을 먼저 완료해주세요.')
          setLoading(false)
          return
        }
        const parsed = JSON.parse(local)

        // 일단 로컬스토리지 정보로 초기화
        setUserInfo({
          name: parsed.name,
          profile: parsed.character || '/store/기와집.png',
          intro: parsed.introduce || '안녕하세요! 여기는 당신의 가게입니다.',
          category: parsed.category,
          address: parsed.address || '',
          openDate: parsed.openingDate || '',
        })

        // 서버에서 최신 정보 불러오기 (선택적)
        const res = await axios.get(`https://indev-project.p-e.kr/store/${parsed.store_id}/`)
        const data = res.data || {}

        setUserInfo({
          name: data.name ?? parsed.name,
          profile: parsed.character || '/store/기와집.png',
          intro: data.introduce ?? parsed.introduce,
          category: data.category ?? parsed.category,
          address: data.address ?? parsed.address,
          openDate: data.openingDate ?? parsed.openingDate,
        })
      } catch (e) {
        console.error('가게 정보 로드 실패:', e)
        setError(e?.response?.data ? JSON.stringify(e.response.data) : '가게 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchStore()
  }, [])

  return (
    <div className='owner-dashboard'>
      <OwnerAppHeader />

      <div className="dashboard-container">
        {loading && <p className="loading-text">가게 정보를 불러오는 중...</p>}
        {!!error && !loading && <p className="error-text">오류: {error}</p>}

        {!loading && !error && (
          <div className="dashboard-userinfo">
            <img src={userInfo.profile} alt="프로필" className="profile-img" />
            <div className="user-greeting">
              {userInfo.name}! <p>어서오시오 ~</p>
            </div>

            {userInfo.category && <p className="user-meta">분류: {userInfo.category}</p>}
            {userInfo.address && <p className="user-meta">주소: {userInfo.address}</p>}
            {userInfo.openDate && <p className="user-meta">개업일: {userInfo.openDate}</p>}

            <p className="user-intro">{userInfo.intro}</p>
          </div>
        )}

        {/* 지도 섹션 (데모용) */}
        <div className="dashboard-map">
          <h3 className="section-title">내 주변 가게</h3>
          <StoreMap stores={[]} radiusKm={3} />
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
