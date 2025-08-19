import React from 'react'
import './OwnerQuest.css'
import OwnerAppHeader from '../OwnerAppHeader/OwnerAppHeader'
import { useState, useEffect } from 'react'
import axios from 'axios' 

const OwnerQuest = () => {
  const [missionData, setMissionData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchMissions = async () => {
    try {
      const response = await axios.get('/mission/owner-missions/${userpk}/')
      setMissionData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchMissions()
  }, [])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='owner-quest'>
      <OwnerAppHeader />
      <div className='owner-quest-underheader'>

      <div className='owner-myquest'>    
      <h1 className='owner-myquest-title'>의뢰 입력 및 수정</h1>
      <p className='owner-myquest-description'>"고객에게 전하고픈 마실 미션을 작성해보세요"</p>

      <div className='owner-mission-list'>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
        <div className='owner-mission-hanjul'>
          미션어쩌구저쩌구저쩌구
        </div>
      </div>
      <button 
      className="owner-mission-button"
      //onClick={handleWritemission} 
      >
      의뢰 작성하기
      </button>
      
      </div>

      <div className='owner-request'>
        <h1 className='owner-request-title'>요청된 의뢰들</h1>
      </div>

      </div>
  

  

    </div>
 

      
  )
}

export default OwnerQuest
