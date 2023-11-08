import React from 'react'
import notFountImg from '../images/404.png'
import ErrorButtons from '../components/ErrorComponents/ErrorButtons'

export default function Error() {
  return (
    <div className='notFountPage'>
      <img src={notFountImg} alt="" />
      <ErrorButtons />
    </div>
  )
}
