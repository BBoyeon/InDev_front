// src/Customer/CustomerDashboard/CustomerDashboard.jsx
import React, { useEffect, useState } from 'react'
import './CustomerDashboard.css'
import AppHeader from '../CustomerAppHeader/AppHeader'
import StoreMap from '../../StoreMap/StoreMap'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const characterList = {
  1: "/character/남자캐릭터.png",
  2: "/character/여자캐릭터.png",
  3: "/character/고양이캐릭터.png",
  4: "/character/도깨비캐릭터.png",
}

const CustomerDashboard = () => {
  const { id } = useParams() // URL 파라미터로부터 고객 id 가져오기
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`https://indev-project.p-e.kr/customer/${id}/`)
        setCustomer(response.data)
      } catch (err) {
        console.error("고객 정보 불러오기 실패:", err)
        setError("고객 정보를 불러올 수 없습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])


  if (loading) {
    return (
      <div className="customer-dashboard">
        <AppHeader />
        <div className="dashboard-container">
          <p>고객 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="customer-dashboard">
        <AppHeader />
        <div className="dashboard-container">
          <p>{error || "고객 정보가 없습니다. 처음부터 다시 시작해주세요."}</p>
        </div>
      </div>
    )
  }

  // ✅ 예시 가게 데이터
  const stores = [
    {
      name: "마실 떡볶이",
      lat: 37.5665,
      lng: 126.9780,
      category: "분식",
      address: "서울 중구 세종대로 110"
    },
    {
      name: "옆집 분식",
      lat: 37.5675,
      lng: 126.9820,
      category: "분식",
      address: "서울 종로구 종로 1가"
    },
    {
      name: "단골 김밥",
      lat: 37.5640,
      lng: 126.9760,
      category: "김밥",
      address: "서울 중구 남대문로"
    }
  ]

  return (
    <div className="customer-dashboard">
      <AppHeader />
      <div className="dashboard-container">
        <div className="dashboard-userinfo">
          {/* character 숫자 → 이미지 매핑 */}
          <img 
            src={characterList[customer.character] || "/character/남자캐릭터.png"} 
            alt="프로필" 
            className="profile-img" 
          />
          <div className="user-greeting">
            {customer.nickname}{" "}
            {customer.gender === 'F' ? '낭자' : '도령'} ! <p>어서오시오 ~</p>
          </div>
          <p className="user-intro">{customer.intro}</p>
        </div>

        <div className="dashboard-map">
          <h3>내 주변 가게</h3>
          <StoreMap stores={stores} radiusKm={3} />
        </div>

        <div className="dashboard-banner">
          <img src="/ㅇ.png" alt="광고 배너 자리" className="banner-img" />
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard