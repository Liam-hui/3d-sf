import React, { useMemo, useEffect, useRef, Suspense } from 'react'
import { useHistory } from "react-router-dom"

export default function Projects() {

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

