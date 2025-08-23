import React from 'react'
import './OwnerAi.css'
import AppHeader  from '../OwnerAppHeader/OwnerAppHeader'
import { useState } from 'react'

const OwnerAi = () => {
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
    <div className="owner-ai">
        <AppHeader />
         <div className="dashboard-banner">
           <div className='aiImageMake'>
          <h2 className='aiImageMake-title'>AI 이미지 생성</h2>
          <p className='aiImageMake-description'>AI를 통해 가게의 이미지를 생성해보세요!</p>
          <button className='aiImageMake-btn' onClick={handleOpenModal}>
            이미지 생성하러 가기
          </button>
        </div>
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

export default OwnerAi
