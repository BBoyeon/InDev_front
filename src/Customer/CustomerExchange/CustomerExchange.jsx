import React from 'react'
import './CustomerExchange.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'  

const CustomerExchange = () => {
  return (
    <div className='customer-exchange'>
      <AppHeader />
      <h1>포인트 교환 화면</h1>
    </div>
  )
}

export default CustomerExchange