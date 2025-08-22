import React from 'react'
import './CustomerBadges.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'  

const CustomerBadges = () => {
  return (
    <div className='customer-badges'>
      <AppHeader />
      <h1>뱃지 화면</h1>
    </div>
  )
}

export default CustomerBadges