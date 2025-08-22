import React, { useState } from 'react'
import './OwnerOnboarding.css'
import { useNavigate } from 'react-router-dom'


const characterList = [
  { src: "/store/주막.png", alt: "주막" },
  { src: "/store/기와집.png", alt: "기와집" },
  { src: "/store/시장.png", alt: "시장" },
  { src: "/store/책방.png", alt: "책방" },
]

const categoryList = ["식당", "카페", "서점", "소품샵", "기타"]

const OwnerOnboarding = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [storeName, setStoreName] = useState("")
  const [introduce, setIntroduce] = useState("")
  const [openingDate, setOpeningDate] = useState("")
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!storeName || !introduce || selectedIdx === null || !openingDate || !address || !category) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    localStorage.setItem('storeName', storeName)
    localStorage.setItem('introduce', introduce)
    localStorage.setItem('character', characterList[selectedIdx].src)
    localStorage.setItem('openingDate', openingDate)
    localStorage.setItem('address', address)
    localStorage.setItem('category', category)

    navigate('/owner-dashboard')
  }

  return (
    <div className="Owner-onboarding">
      <h1 className="Owner-onboarding-title">~ 당신의 업장을 알려주시오 ~</h1>
      <h2 className="Owner-onboarding-subtitle">원하는 모습을 선택해주시오!</h2>
      <div className="Owner-onboarding-options">
        {characterList.map((char, idx) => (
          <img
            key={char.alt}
            src={char.src}
            alt={char.alt}
            className={selectedIdx === idx ? "Owner-onboarding-option selected" : "Owner-onboarding-option"}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>

      <div className="Owner-onboarding-inputs">
        <div className="Owner-onboarding-name-input-container">
          <p className='Owner-onboarding-name'>가게 이름 :</p>
          <input
            type="text"
            className="Owner-onboarding-name-input"
            placeholder="가게 이름을 입력하세요"
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className="Owner-onboarding-date-input-container">
          <p className='Owner-onboarding-date'>개업일 :</p>
          <input
            type="date"
            className="Owner-onboarding-date-input"
            onChange={(e) => setOpeningDate(e.target.value)}
          />
        </div>

        <div className="Owner-onboarding-address-input-container">
          <p className='Owner-onboarding-address'>주소 :</p>
          <input
            type="text"
            className="Owner-onboarding-address-input"
            placeholder="주소를 입력하세요"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="Owner-onboarding-category-input-container">
          <p className='Owner-onboarding-category'>카테고리 :</p>
          <div className='Owner-onboarding-category-buttons'>
            {categoryList.map((cat) => (
              <button
                key={cat}
                type="button"
                className={category === cat ? 'category-button selected' : 'category-button'}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="Owner-onboarding-introduce-input-container">
          <p className='Owner-onboarding-introduce'>한 줄 소개 :</p>
          <input
            type="text"
            className="Owner-onboarding-introduce-input"
            placeholder="한줄소개를 입력하세요"
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </div>

      </div>

        <button onClick={handleSubmit} className="Owner-onboarding-submit">시작하겠소!</button>
    </div>
  )
}

export default OwnerOnboarding