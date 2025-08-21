import React from 'react'
import './CustomerRecord.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import { useNavigate } from 'react-router-dom'  

const CustomerRecord = () => {
  return (
    <div className='customer-record'>
      <AppHeader />
      <h1>마실 기록 화면</h1>
    </div>
  )
}

export default CustomerRecord