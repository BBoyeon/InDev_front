import React from 'react'
import './CustomerPoint.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'  

const CustomerPoint = () => {
  return (
    <div className='customer-point'>
      <AppHeader />
      <h1>포인트 확인 화면</h1>
    </div>
  )
}

export default CustomerPoint