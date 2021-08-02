import React, { useMemo, useEffect, useRef, Suspense } from 'react'
import { useLocation, useHistory } from "react-router-dom"

export default function About() {

  const history = useHistory()

  const onClick = () => {
    history.push('/')
  }

  return (
    <div className='page-container'>
      <div onClick={onClick} className='back-button'>
        back
      </div>
    </div>
  )
}

