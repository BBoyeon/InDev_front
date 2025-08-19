import React from 'react'
import './RoleChoice.css'
import { useNavigate } from 'react-router-dom'
import CustomerOnboarding from "./Customer/CustomerOnboarding/CustomerOnboarding";
import OwnerOnboarding from "./Owner/OwnerOnboarding/OwnerOnboarding";


const RoleChoice = () => {
    const navigate = useNavigate()
    const handleCustomerClick = () => {
        // Navigate to the CustomerOnboarding component when the button is clicked
        navigate('/customer-onboarding')
    }
    const handleOwnerClick = () => {
        // Navigate to the OwnerOnboarding component when the button is clicked
        navigate('/owner-onboarding')
    }
  return (
    <div className='role-choice'>
      <h1 className='role-choice-title'>오신 목적이 무엇이오?</h1>
      <div className='role-choice-buttons'>
        <button onClick={handleCustomerClick} className='role-choice-customer'>마실을 나가고 싶소(일반손님)</button>
        <button onClick={handleOwnerClick} className='role-choice-owner'>마실 다니는 손님을 받고 싶소(가게점주)</button>
      </div>
    </div>
  )
}

export default RoleChoice
