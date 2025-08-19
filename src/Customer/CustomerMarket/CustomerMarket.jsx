import React from 'react'
import './CustomerMarket.css'
import AppHeader from '../CustomerAppHeader/AppHeader';
import ShareMarket from '../../ShareMarket';

const CustomerMarket = () => {
  return (
    <div className="customer-market">
        <AppHeader activeMenu="market" />
        <ShareMarket />
    </div>
  )
}

export default CustomerMarket
