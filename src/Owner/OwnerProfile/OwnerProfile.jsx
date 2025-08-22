import React, { useState } from 'react'
import './OwnerProfile.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'

const OwnerProfile = () => {
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
    <div className='owner-profile'>
      <OwnerAppHeader />

      <div className='owner-profile-flex-container'>
        <div className='owner-profile-left-container'>
          <div className='owner-profile-container'>
            <h1 className='owner-profile-title'>가게 프로필</h1>
            <div className='owner-profile-info'>
              <img 
                src={localStorage.getItem('character') || '/character/남자캐릭터.png'} 
                alt="가게 프로필" 
                className='owner-profile-img' 
              />

              <div className='owner-profile-manydetail'>
                <div className='owner-profile-details'>
                  <p><strong>* 가게 이름:</strong> {localStorage.getItem('storename') || '손님'}</p>
                  <p><strong>* 소개:</strong> {localStorage.getItem('introduce') || '안녕하세요! 여기는 당신의 가게입니다.'}</p>
                  <p><strong>* 카테고리:</strong> {localStorage.getItem('category') || '기타'}</p>
                  <p><strong>* 주소:</strong> {localStorage.getItem('address') || '주소 미등록'}</p>
                </div>
                <button 
                  className='owner-profile-edit-btn' 
                  onClick={() => alert("프로필 수정 기능은 추후 구현 예정입니다.")}
                >
                  프로필 수정
                </button>  
              </div>
            </div>
          </div>

          <div className='MyMassilRecord'>
            <h2 className='MyMassilRecord-title'>나의 마실 기록</h2>
          </div>
        </div>

        <div className='UserVisitRecord'>
          <h2 className='UserVisitRecord-title'>방문한 손님 기록</h2>
          <p>이번주 손님 참여 24명
              미션 성공률 75%
              인기 미션: “웰컴 미션” 이런거 넣으면 될듯..?</p>
        </div>
      </div>

      {/* 모달 */}
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

export default OwnerProfile