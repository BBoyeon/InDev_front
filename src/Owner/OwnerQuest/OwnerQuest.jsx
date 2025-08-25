import React, { useEffect, useState } from 'react'
import './OwnerQuest.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import axios from 'axios'

const OwnerQuest = () => {
  // --- 나의 의뢰(등록한 미션) ---
  const [missions, setMissions] = useState([]);

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
  const [reward, setReward] = useState('') // 숫자 입력(문자열로 들어오니 변환 필요)
  const openForm = () => setShowForm(true)
  const closeForm = () => {
    setShowForm(false)
    setTitle(''); setContent(''); setReward('')
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

  useEffect(() => {
  const fetchMissions = async () => {
    try {
      const res = await axios.get("https://indev-project.p-e.kr/mission/owner-missions/${ localStorage.getItem('user_pk') }/");
      console.log("불러온 미션:", res.data);
      setMissions(res.data);  // ✅ 받아온 데이터로 state 업데이트
    } catch (err) {
      console.error("미션 불러오기 실패:", err);
    }
  };

  fetchMissions();
}, []);


  // --- 서버로 미션 생성 ---
  const handleWrite = async (e) => {
    e.preventDefault();

    const t = (title || '').trim();
    const text = (content || '').trim();
    const rew = Number(reward); // 숫자 변환 (NaN이면 아래에서 0으로 처리)

    if (!t) return alert('제목을 입력해주세요.');
    if (!text) return alert('내용을 입력해주세요.');

    // store pk 확보 + 숫자화
    const raw = localStorage.getItem('user_pk') || localStorage.getItem('store_id');
    const storeId = Number(raw);
    if (!storeId) return alert('가게 ID가 없습니다. 온보딩을 먼저 완료해주세요.');

    // (선택) store 존재 검증
    try {
      await axios.get(`https://indev-project.p-e.kr/store/${storeId}/`);
    } catch (err) {
      return alert(`유효하지 않은 가게 ID(${storeId})입니다. 온보딩을 다시 진행해주세요.`);
    }

    // 서버 스키마에 맞춰 모든 필드 포함
    const payload = {
      store: storeId,
      title: t,
      content: text,
      reward: Number.isFinite(rew) ? rew : 0,
      is_active: true,
    };

    const url = 'https://indev-project.p-e.kr/mission/owner-missions/';

    try {
      console.log('[DEBUG] POST', url, payload);
      const res = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200 || res.status === 201) {
        alert('의뢰가 성공적으로 등록되었습니다!');
        // 서버 응답(아이디 포함)으로 목록 갱신
        setMissions(prev => [...prev, res.data]);
        closeForm();
      } else {
        console.log('[DEBUG] unexpected:', res.status, res.data);
        alert('의뢰 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error('의뢰 작성 실패:', error);
      alert(
        `의뢰 등록 실패: ${
          data ? JSON.stringify(data) : error.message
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
                key={m.id ?? `mission-${Math.random()}`} // id가 항상 올 거라면 key={m.id}만
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

            {/* ✅ 폼은 handleWrite 하나만 연결 */}
            <form className='mission-form' onSubmit={handleWrite}>
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
                  placeholder="예) 아메리카노 1잔 구매 시 도장 찍기"
                  rows={4}
                  required
                />
              </label>

              <label>
                보상(개수, 숫자)
                <input
                  type="number"
                  min="0"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="예) 1"
                />
              </label>

              <div className='modal-actions'>
                <button type="button" className='btn-secondary' onClick={closeForm}>취소</button>
                {/* ✅ 클릭 핸들러 제거, submit만 */}
                <button type="submit" className='btn-primary'>추가</button>
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
                <p className='mission-detail-text'>
                  {Number.isFinite(Number(selectedMission.reward))
                    ? `${selectedMission.reward}개`
                    : '보상 없음'}
                </p>
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
