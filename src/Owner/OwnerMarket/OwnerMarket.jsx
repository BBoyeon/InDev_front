import React from 'react'
import './OwnerMarket.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import { useNavigate } from 'react-router-dom'
import ShareMarket from '../../ShareMarket';

const OwnerMarket = () => {
  return (
    <div className='owner-market'>
      <OwnerAppHeader/>
      <ShareMarket />
    </div>
  )
}

export default OwnerMarket
