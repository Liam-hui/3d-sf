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

  const onClick = () => {
    store.dispatch({ type: 'SET_LOCATION', location: location })
  }

  return (
    <StyledItem className={currentLocation == location ? 'is-focus' : ''}>
      <Dot onClick={onClick}>
        {location == 'home' ? <img src={require('@/assets/icons/icon-home.svg').default}/> : <div/>}
      </Dot>
      {location != 'home' && <ItemName>{location}</ItemName>}
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



