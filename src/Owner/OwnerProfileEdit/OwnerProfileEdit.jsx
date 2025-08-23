import React from 'react'
import './OwnerProfileEdit.css'
import AppHeader  from '../OwnerAppHeader/OwnerAppHeader'
import { useNavigate } from 'react-router-dom'

const OwnerProfileEdit = () => {
  return (
    <div className="owner-profile-edit">
      <AppHeader />
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
    </div>
  )
}

export default OwnerProfileEdit
