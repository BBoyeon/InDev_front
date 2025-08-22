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
    const [showImageModal, setShowImageModal] = useState(false)
    const [prompt, setPrompt] = useState('')
  
    const handleOpenModal = () => setShowImageModal(true)
    const handleCloseModal = () => {
      setShowImageModal(false)
      setPrompt('')
    }
  
    const handleGenerate = () => {
      if (!prompt.trim()) {
        alert("프롬프트를 입력해주세요!")
        return
      }
      // TODO: 여기서 axios.post로 백엔드 이미지 생성 API 호출하면 됨
      console.log("이미지 생성 요청:", prompt)
      alert(`"${prompt}" 로 이미지 생성 요청! (추후 구현 예정)`)
      handleCloseModal()
    }

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
        </div>

        {/* 지도 섹션 */}
        <div className="dashboard-map">
          <h3 className="section-title">내 주변 가게</h3>
          <StoreMap stores={stores} radiusKm={3} />
        </div>

        {/* 배너/홍보 섹션 (AI 전단지 등) */}
        <div className="dashboard-banner">
           <div className='aiImageMake'>
          <h2 className='aiImageMake-title'>AI 이미지 생성</h2>
          <p className='aiImageMake-description'>AI를 통해 가게의 이미지를 생성해보세요!</p>
          <button className='aiImageMake-btn' onClick={handleOpenModal}>
            이미지 생성하러 가기
          </button>
        </div>
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
