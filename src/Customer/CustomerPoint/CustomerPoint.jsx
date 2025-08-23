import React from 'react'
import './CustomerPoint.css'
import AppHeader from '../CustomerAppHeader/AppHeader'

const CustomerPoint = () => {
  const pointHistory = [
    { id: 1, title: '○○ 가게 - 리뷰 이벤트 작성하고 쿨피스 받기', amount: 500 },
    { id: 2, title: '○○ 마을 회관 - 게시판 글 남기기 캠페인', amount: 300 },
    { id: 3, title: '○○ 서점 - 이 달의 책 읽기', amount: 200 },
    { id: 4, title: '○○ 카페 - 민트 초코 음료 마시기', amount: 500 },
  ]

  const totalPoints = pointHistory.reduce((acc, cur) => acc + cur.amount, 0)

  return (
    <div className="customer-point">
      <AppHeader />
      <div className="point-outer">
        <div className="point-container">
          <h2 className="point-total">총 획득 엽전 : <span>{totalPoints}</span> 엽전</h2>
         <table className="point-table">
           <thead>
              <tr>
                <th>미션 내역</th>
                <th>획득 엽전</th>
             </tr>
            </thead>
           <tbody>
             {pointHistory.map(entry => (
               <tr key={entry.id}>
                 <td>{entry.title}</td>
                 <td>{entry.amount}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      </div>
    </div>
  )
}

export default CustomerPoint
