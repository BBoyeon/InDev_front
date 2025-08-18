import React from 'react'
import './OwnerDashboard.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import { useNavigate } from 'react-router-dom'  

const OwnerDashboard = () => {
  return (
    <div className='owner-dashboard'>
      <OwnerAppHeader />
    </div>
  )
}

export default OwnerDashboard
