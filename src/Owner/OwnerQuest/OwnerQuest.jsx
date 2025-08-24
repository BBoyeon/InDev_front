import React, { useEffect, useState } from 'react'
import './OwnerQuest.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'

const OwnerQuest = () => {
  // --- 나의 의뢰(등록한 미션) ---
  const [missions, setMissions] = useState([
    { id: 1, title: '첫 방문 웰컴 미션', content: "음료 픽업 시 '마실 왔어요'라고 말하기", reward: '스탬프 1개' },
    { id: 2, title: '시그니처 음료 인증샷', content: '가게 로고가 보이게 컵 인증샷 찍기', reward: '쿠키 1EA' },
    { id: 3, title: '사장님에게 한마디', content: "계산 시 '오늘도 번창하세요'라고 말해보기", reward: '' },
  ])

  // --- 요청된 의뢰들(손님 요청) ---
  const [requests, setRequests] = useState([
    { id: 101, title: '스탬프 더블 이벤트 요청', requester: '김마실', completed: false },
    { id: 102, title: '신메뉴 시식 미션 요청', requester: '이단골', completed: false },
    { id: 103, title: '리뷰 남기기 미션 요청', requester: '박손님', completed: true },
  ])

  // 앱 로드 시 localStorage에서 완료 내역을 불러와서 requests에 반영
  useEffect(() => {
    const stored = localStorage.getItem('completedRequests')
    if (!stored) return
    try {
      const completedArr = JSON.parse(stored) // [{id, title, requester, completed:true}, ...]
      if (Array.isArray(completedArr)) {
        setRequests(prev =>
          prev.map(r => {
            const hit = completedArr.find(c => c.id === r.id)
            return hit ? { ...r, completed: true } : r
          })
        )
      }
    } catch (_) {}
  }, [])

  // --- 상세 모달 ---
  const [selectedMission, setSelectedMission] = useState(null)
  const openDetail = (m) => setSelectedMission(m)
  const closeDetail = () => setSelectedMission(null)

  // --- 작성 모달 ---
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [reward, setReward] = useState('')
  const openForm = () => setShowForm(true)
  const closeForm = () => {
    setShowForm(false)
    setTitle(''); setContent(''); setReward('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    const newMission = {
      id: missions.length ? missions[missions.length - 1].id + 1 : 1,
      title, content, reward
    }
    setMissions(prev => [...prev, newMission])
    closeForm()
  }

  // --- 완료 처리 & localStorage 반영 ---
  const persistCompleted = (updatedRequests) => {
    const completed = updatedRequests.filter(r => r.completed)
    localStorage.setItem('completedRequests', JSON.stringify(completed))
  }

  const handleCompleteRequest = (id) => {
    setRequests(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, completed: true } : r))
      persistCompleted(updated)
      return updated
    })
  }

 const handleWrite = async () => {
  try {
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 🔑 로컬스토리지에서 store id 꺼내오기
    const storeId = Number(localStorage.getItem("user_pk") || localStorage.getItem("store_id"));
    if (!storeId) {
      alert("가게 ID를 찾을 수 없습니다. 온보딩을 먼저 완료해주세요.");
      return;
    }

    // 서버가 기대하는 JSON payload
    const payload = {
      store: storeId,
      content: content.trim(),
      is_active: true,
    };

    const token = localStorage.getItem("token"); // 인증 필요시
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await axios.post(
      "https://indev-project.p-e.kr/mission/owner-missions/", // ← 실제 엔드포인트 확인!
      payload,
      { headers }
    );

    if (response.status === 201 || response.status === 200) {
      alert("의뢰가 성공적으로 작성되었습니다.");
      // 서버 응답 데이터(response.data)에 id 포함 → 목록 업데이트
      setMissions((prev) => [...prev, response.data]);
      closeForm();
    } else {
      alert("의뢰 작성에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("의뢰 작성 실패:", error);
    console.log("status:", error?.response?.status);
    console.log("data:", error?.response?.data);
    alert(
      `의뢰 작성 중 오류가 발생했습니다. ${
        error?.response?.data ? JSON.stringify(error.response.data) : "콘솔 로그를 확인하세요."
      }`
    );
  }
};



  return (
    <div className='owner-quest'>
      <OwnerAppHeader />
      <div className='owner-quest-underheader'>

        {/* 나의 의뢰 섹션 */}
        <div className='owner-myquest'>
          <h1 className='owner-myquest-title'>의뢰 입력 및 수정</h1>
          <p className='owner-myquest-description'>"고객에게 전하고픈 마실 미션을 작성해보세요"</p>

          {/* 제목만 나열 */}
          <div className='owner-mission-title-list'>
            {missions.map((m) => (
              <button
                key={m.id}
                className='mission-title-item'
                onClick={() => openDetail(m)}
                title='상세 보기'
              >
                {m.title}
              </button>
            ))}
          </div>

          <button className="owner-mission-button" onClick={openForm}>
            의뢰 작성하기
          </button>
        </div>

        {/* 요청된 의뢰들 섹션 */}
        <div className='owner-request'>
          <h1 className='owner-request-title'>요청된 의뢰들</h1>

          <div className='request-list'>
            {requests.length === 0 && (
              <div className='request-empty'>요청된 의뢰가 없습니다.</div>
            )}

            {requests.map((req) => (
              <div key={req.id} className={`request-row ${req.completed ? 'is-completed' : ''}`}>
                <div className='request-title' title={req.title}>{req.title}</div>
                <div className='request-requester'>{req.requester}</div>
                <div className='request-actions'>
                  {req.completed ? (
                    <span className='request-status-badge'>완료됨</span>
                  ) : (
                    <button
                      className='btn-complete'
                      onClick={() => handleCompleteRequest(req.id)}
                    >
                      완료
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 기록 페이지로 이동하는 링크(선택) */}
          {/* <Link to="/owner/quest-history" className="link-history">완료 기록 보러가기 →</Link> */}
        </div>

      </div>

      {/* 작성 모달 */}
      {showForm && (
        <div className='modal-backdrop' onClick={closeForm}>
          <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>의뢰 작성</h2>
              <button className='modal-close' onClick={closeForm}>×</button>
            </div>

            <form className='mission-form' onSubmit={handleSubmit}>
              <label>
                제목
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예) 첫 방문 고객 웰컴 미션"
                  required
                />
              </label>

              <label>
                내용
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="예) 음료 픽업 시 '마실 왔어요'라고 말하기"
                  rows={4}
                  required
                />
              </label>

              <label>
                보상 (선택)
                <input
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="예) 스탬프 1개, 쿠키 1EA 등"
                />
              </label>

              <div className='modal-actions'>
                <button type="button" className='btn-secondary' onClick={closeForm}>취소</button>
                <button type="submit" className='btn-primary' onClick={handleWrite}>추가</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 상세 모달 */}
      {selectedMission && (
        <div className='modal-backdrop' onClick={closeDetail}>
          <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>{selectedMission.title}</h2>
              <button className='modal-close' onClick={closeDetail}>×</button>
            </div>

            <div className='mission-detail-body'>
              <div className='mission-detail-row'>
                <span className='mission-detail-label'>내용</span>
                <p className='mission-detail-text'>{selectedMission.content || '내용 없음'}</p>
              </div>

              <div className='mission-detail-row'>
                <span className='mission-detail-label'>보상</span>
                <p className='mission-detail-text'>{selectedMission.reward || '보상 없음'}</p>
              </div>
            </div>

            <div className='modal-actions'>
              <button className='btn-secondary' onClick={closeDetail}>닫기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default OwnerQuest