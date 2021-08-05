import React from 'react'
import store from '@/store'

export default function About() {

  const onClick = () => {
    store.dispatch({ type: 'SET_LOCATION', location: 'home' })
  }

  return (
    <div className='page-container'>
      <div className='page-content'>
        <div onClick={onClick} className='back-button'>
          {'< back'}
        </div>
        <h2>
          The Right Partner
          <br/> 
          for your business
        </h2>
        <p>
          We are a team of talented Hong Kong developers and designers.
          <br/> 
          With cutting-edge technologies and best practices, we deliver great quality web and mobile apps solution.
        </p>
        <p>
          We providing end-to-end solutions that help drive organizations forward. We understand Technology is rapidly evolving and our list of services and skill sets changes persistently to adapt to new industry challenges.
        </p>
        <p>
          We think, act and feel as like a startup adapting quickly, ducking hazards, and grabbing opportunities faster.
        </p>
        <p>
          And YES, We write good code and good design only.
        </p>
      </div>
    </div>
  )
}

