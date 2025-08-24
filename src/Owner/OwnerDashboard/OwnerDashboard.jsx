// src/Owner/OwnerDashboard/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react'
import './OwnerDashboard.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import StoreMap from '../../StoreMap/StoreMap'
import axios from 'axios'

const OwnerDashboard = () => {
  // 화면 상태
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 가게 정보 (API에서 채움)
  const [userInfo, setUserInfo] = useState({
    name: '손님',
    profile: '/store/기와집.png',
    intro: '안녕하세요! 여기는 당신의 가게입니다.',
    category: '',
    address: '',
    openDate: '', // YYYY-MM-DD
  })

  // (데모) 지도 데이터 - 필요 시 API 연동으로 교체
  const [stores] = useState([
    { id: 1, name: '한옥 카페', lat: 37.5651, lng: 126.9785, category: '카페', address: '서울 중구 을지로' },
    { id: 2, name: '단골 분식', lat: 37.5668, lng: 126.9822, category: '분식', address: '서울 중구 충무로' },
    { id: 3, name: '마실 주막', lat: 37.5635, lng: 126.9760, category: '주점', address: '서울 중구 덕수궁로' },
  ])

  // === API로 가게 정보 불러오기 ===
  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true)
        setError('')

        // 온보딩에서 저장한 스토어 ID
        const storedId = localStorage.getItem('user_pk') || localStorage.getItem('store_id')
        if (!storedId) {
          setError('가게 ID를 찾을 수 없어요. 온보딩을 먼저 완료해주세요.')
          setLoading(false)
          return
        }

        // (인증 필요하면 Authorization 헤더 추가)
        // const token = localStorage.getItem('access_token')
        // const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const headers = {}

        const res = await axios.get(`https://indev-project.p-e.kr/store/${storedId}/`, { headers })
        const data = res.data || {}

        // 서버 필드 매핑
        const name = data.name ?? '손님'
        const intro = data.intro ?? '안녕하세요! 여기는 당신의 가게입니다.'   // 🔑 intro 사용
        const address = data.address ?? ''
        const categoryName = data.category_name ?? data.category ?? ''         // 서버 구현에 따라 문자열/숫자일 수 있음
        const openDate = data.open_date ?? ''                                  // YYYY-MM-DD
        const profile =
          data.image_url ||
          localStorage.getItem('character') ||
          '/store/기와집.png'

        setUserInfo({
          name,
          profile,
          intro,
          category: categoryName,
          address,
          openDate,
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

  // === (선택) AI 이미지 모달 ===
  const [showImageModal, setShowImageModal] = useState(false)
  const [prompt, setPrompt] = useState('')
  const handleOpenModal = () => setShowImageModal(true)
  const handleCloseModal = () => { setShowImageModal(false); setPrompt('') }
  const handleGenerate = () => {
    if (!prompt.trim()) { alert('프롬프트를 입력해주세요!'); return }
    console.log('이미지 생성 요청:', prompt)
    alert(`"${prompt}" 로 이미지 생성 요청! (추후 구현 예정)`)
    handleCloseModal()
  }

  return (
    <div className='owner-dashboard'>
      <OwnerAppHeader />

      <div className="dashboard-container">
        {/* 로딩/에러 */}
        {loading && <p className="loading-text">가게 정보를 불러오는 중...</p>}
        {!!error && !loading && <p className="error-text">오류: {error}</p>}

        {/* 가게 프로필 카드 */}
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

            {/* (선택) AI 이미지 생성 버튼 */}
            <button className="ai-generate-btn" onClick={handleOpenModal}>
              가게 이미지 생성하기
            </button>
          </div>
        )}

        {/* 지도 섹션 */}
        <div className="dashboard-map">
          <h3 className="section-title">내 주변 가게</h3>
          <StoreMap stores={stores} radiusKm={3} />
        </div>

        {/* 장식 요소 */}
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-1" />
        <img src="/decorate/기와요소.png" alt="기와그림" className="owner-deco-2" />
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-3" />
        <img src="/decorate/구름요소2.png" alt="구름요소2" className="owner-deco-4" />
      </div>

      {showImageModal && (
        <div className='modal-backdrop' onClick={handleCloseModal}>
          <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>AI 이미지 생성</h2>
              <button className='modal-close' onClick={handleCloseModal}>×</button>
            </div>

            <textarea
              className='prompt-input'
              placeholder="프롬프트를 입력하세요. 예) 수제 소스를 사용하는, 매콤달콤한 원조 떡볶이 가게 전단지"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />

            <div className='modal-actions'>
              <button className='btn-secondary' onClick={handleCloseModal}>취소</button>
              <button className='btn-primary' onClick={handleGenerate}>생성하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerDashboard
