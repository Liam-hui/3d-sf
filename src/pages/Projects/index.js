import React, { useMemo, useEffect, useRef, Suspense } from 'react'
import { useHistory } from "react-router-dom"

import {
  ContentContainer
} from './styles'

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
      <ContentContainer>
        <p>Projects</p>
        <p>asdfasdf</p>
      </ContentContainer>
    </div>
  )
}

