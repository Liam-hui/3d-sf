import React, { useEffect } from 'react'
import store from '@/store';
import { useSelector } from 'react-redux'

import {
  Container
} from './styles'

import ThreeCanvas from '@/pages/ThreeCanvas'
import About from '@/pages/About'
import Projects from '@/pages/Projects'


export default function Home() {

  const location = useSelector(state => state.location.current)

  return (
    <Container>
      <ThreeCanvas/>
      {location == 'about' && <About/>}
      {location == 'projects' && <Projects/>}
    </Container>
  )
}

