import React, { useState } from 'react'
import './OwnerProfile.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import { useNavigate } from 'react-router-dom'

import OwnerProfileEdit from '../OwnerProfileEdit/OwnerProfileEdit'
import OwnerAi from '../OwnerAi/OwnerAi'
import OwnerRecord from '../OwnerRecord/OwnerRecord'
import OwnerQuestHistory from '../OwnerQuestHistory/OwnerQuestHistory'

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

  const navigate = useNavigate()
  
  

  return (
    <div className='owner-profile'>
      <OwnerAppHeader />

      <div className="profile-underheader">
        <div className="profile-grid">
          <div className="profile-card-edit"
            onClick={() => navigate('/owner-profile-edit')}
          >나의 프로필 수정</div>
          <div className="profile-card-history"
            onClick={() => navigate('/owner-quest-history')}
          >나의 의뢰 완료 기록</div>
          <div className="profile-card-ai"
            onClick={() => navigate('/owner-ai')}>
           ai 전단지 생성하기
          </div>
          <div className="profile-card-record"
            onClick={() => navigate('/owner-record')}
          >나의 마실 나눔 기록들 확인하기</div>
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