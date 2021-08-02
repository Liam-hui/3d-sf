import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"

import {
  Container
} from './styles'

import ThreeCanvas from '@/pages/ThreeCanvas'
import About from '@/pages/About'
import Projects from '@/pages/Projects'


export default function Home() {

  const location = useLocation()

  return (
    <Container>
      <ThreeCanvas/>
      {location.pathname.includes('about') && <About/>}
      {location.pathname.includes('projects') && <Projects/>}
    </Container>
  )
}

