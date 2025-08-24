import React, { useState } from 'react'
import './OwnerOnboarding.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const characterList = [   //그림들
  { id: 5, src: "/store/주막.png",alt: "주막" },
  { id: 6, src: "/store/기와집.png",alt: "기와집" },
  { id: 7, src: "/store/시장.png",alt: "시장" },
  { id: 8, src: "/store/책방.png",alt: "책방" },
]

const categoryList = [
  { id: 1, alt: "식당" },
  { id: 2, alt: "카페" },
  { id: 3, alt: "서점" },
  { id: 4, alt: "소품샵" },
  
]

const OwnerOnboarding = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)   // 캐릭터 인덱스
  const [storeName, setStoreName] = useState("")
  const [introduce, setIntroduce] = useState("")
  const [openingDate, setOpeningDate] = useState("")     // YYYY-MM-DD
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState(null)         // 숫자(pk)만 저장

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();

  const nameTrimmed = storeName.trim();
  const addressTrimmed = address.trim();

  if (!nameTrimmed || !addressTrimmed || category === null) {
    alert("가게 이름, 주소, 카테고리를 모두 입력해주세요.");
    return;
  }

  const payload = {
    name: nameTrimmed,
    address: addressTrimmed,
    category: Number(category),
  };

  try {
    console.log("POST /store/ payload:", payload, { types: {
      name: typeof payload.name, address: typeof payload.address, category: typeof payload.category
    }});
    const res = await axios.post("https://indev-project.p-e.kr/store/", payload, {
      headers: { "Content-Type": "application/json" },
    });
    const data = res.data;

    alert(`회원가입이 완료되었습니다. 환영합니다, ${data.name}님!`);
    localStorage.setItem("user_pk", data.store_id);
    localStorage.setItem("store_name", data.name);
    localStorage.setItem("store_category", String(payload.category));
    localStorage.setItem("character", characterList[selectedIdx]?.src || "");
    localStorage.setItem("introduce", introduce);
    localStorage.setItem("opening_date", openingDate);
    
    navigate('/owner-dashboard');
  } catch (error) {
    console.error("회원가입 실패:", error);
    console.log("status:", error?.response?.status);
    console.log("data:", error?.response?.data); // ← 여기에 필드별 에러가 정확히 찍힘
    alert(`회원가입 실패: ${error?.response?.data ? JSON.stringify(error.response.data) : '콘솔을 확인하세요.'}`);
  }
};


  return (
    <div className="Owner-onboarding">
      <h1 className="Owner-onboarding-title">~ 당신의 업장을 알려주시오 ~</h1>
      <h2 className="Owner-onboarding-subtitle">원하는 모습을 선택해주시오!</h2>

      {/* 캐릭터 선택 */}
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

      <form className="Owner-onboarding-inputs" onSubmit={handleSubmit}>
        <div className="Owner-onboarding-name-input-container">
          <p className="Owner-onboarding-name">가게 이름 :</p>
          <input
            type="text"
            className="Owner-onboarding-name-input"
            placeholder="가게 이름을 입력하세요"
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className="Owner-onboarding-date-input-container">
          <p className="Owner-onboarding-date">개업일 :</p>
          <input
            type="date"
            className="Owner-onboarding-date-input"
            onChange={(e) => setOpeningDate(e.target.value)}
          />
        </div>

        <div className="Owner-onboarding-address-input-container">
          <p className="Owner-onboarding-address">주소 :</p>
          <input
            type="text"
            className="Owner-onboarding-address-input"
            placeholder="주소를 입력하세요"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 카테고리 선택 (pk 숫자만 저장해서 전송) */}
        <div className="Owner-onboarding-category-input-container">
          <p className="Owner-onboarding-category">카테고리 :</p>
          <div className="Owner-onboarding-category-buttons">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={category === cat.id ? "category-button selected" : "category-button"}
                onClick={() => setCategory(cat.id)}  // 숫자 저장
              >
                {cat.alt}
              </button>
            ))}
          </div>
        </div>

        <div className="Owner-onboarding-introduce-input-container">
          <p className="Owner-onboarding-introduce">한 줄 소개 :</p>
          <input
            type="text"
            className="Owner-onboarding-introduce-input"
            placeholder="한줄소개를 입력하세요"
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </div>

        <button type="submit" className="Owner-onboarding-submit">시작하겠소!</button>
      </form>
    </div>
  )
}

export default OwnerOnboarding
