import React from 'react'
import store from '@/store'
import { useSelector } from 'react-redux'

import {
  DotsContainer,
  Dot,
  StyledItem,
  ItemName
} from './styles'

const LOCATIONS = [
  'home',
  'about',
  'projects',
]

const Item = ({ location }) => {
  
  const currentLocation = useSelector(state => state.location.current)

  return (
    <StyledItem className={currentLocation == location ? 'is-focus' : ''}>
      <Dot/>
      <ItemName>{location}</ItemName>
    </StyledItem>
  )
}

export default function Dots() {

  return (
    <DotsContainer>
      {LOCATIONS.map(location => <Item location={location} /> )}
    </DotsContainer>
  )

}



