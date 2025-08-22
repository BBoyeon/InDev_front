import React from 'react'
import './OwnerDashboard.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import { useNavigate } from 'react-router-dom'  
import { useEffect, useState } from 'react'


const OwnerDashboard = () => {
   const [userInfo, setUserInfo] = useState({
    storename: '손님',
    profile: '/store/기와집.png',   
    introduce: '안녕하세요! 여기는 당신의 가게입니다.',
  })

 useEffect(() => {
    const name = localStorage.getItem('storename') || '손님'
    const intro = localStorage.getItem('introduce') || ''
    const profile = localStorage.getItem('character') || '/character/남자캐릭터.png'
    setUserInfo({ name, intro, profile })
  }, [])

  return(

    <div className='owner-dashboard'>
      <OwnerAppHeader />
        <div className="dashboard-container">
        <div className="dashboard-userinfo">
          <img src={userInfo.profile} alt="프로필" className="profile-img" />
          <div className="user-greeting">
            {userInfo.name}! <p>어서오시오 ~</p>
          </div>
          <p className="user-intro">{userInfo.intro}</p>
        </div>

        <div className="dashboard-map">
          <div className="map-placeholder">지도 영역 (추후 GPS 적용)</div>
        </div>

        <div className="dashboard-banner">
          <img src="/ㅇ.png" alt="광고 배너 자리" className="banner-img" />
        </div>
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-1" />
        <img src="/decorate/기와요소.png" alt="기와그림" className="owner-deco-2" />
        <img src="/decorate/산요소.png" alt="산그림" className="owner-deco-3" />
        <img src="/decorate/구름요소2.png" alt="구름요소2" className="owner-deco-4" />

      </div>
    </div>
  )
}

export default OwnerDashboard
