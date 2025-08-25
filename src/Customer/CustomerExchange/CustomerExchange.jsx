import React, { useState } from 'react'
import './CustomerExchange.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const items = [
  { id: 1, name: 'CU 편의점 5천원 쿠폰', cost: 8000 },
  { id: 2, name: '스타벅스 아메리카노 쿠폰', cost: 7500 },
  { id: 3, name: 'GS25 편의점 5천원 쿠폰', cost: 8000 },
  { id: 4, name: '인천e음 1만원권', cost: 15000 },
  { id: 5, name: '문화상품권 1만원권', cost: 18000 },
  { id: 5, name: '문화상품권 3만원권', cost: 48000 },
]

const CustomerExchange = () => {
  const [userPoint, setUserPoint] = useState(8300)

  const handleExchange = (cost) => {
    if (userPoint >= cost) {
      setUserPoint(prev => prev - cost)
      alert('교환 완료!')
    } else {
      alert('엽전이 부족합니다!')
    }
  }

  return (
    <div className='customer-exchange'>
      <AppHeader />
      <div className="exchange-outer">
        <div className='exchange-container'>
          <h2 className='point-display'>현재 엽전: {userPoint.toLocaleString()} 엽전</h2>
          <div className='item-list'>
            {items.map(item => (
              <div key={item.id} className='item-box'>
                <h3>{item.name}</h3>
                <div className='item-img'>사진</div>
                <button onClick={() => handleExchange(item.cost)}>
                  {item.cost.toLocaleString()} 엽전
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerExchange
