import React, { useState, useEffect } from 'react';

import {
  MenuWrapper,
  MenuButton,
  MenuContainer,
  BlackOverlay
} from './styles'

export default function Menu() {

  const [isOpened, setIsOpened] = useState(false)

  const toggleMenu = () => {
    setIsOpened(!isOpened)
  }

  const closeMenu = () => {
    setIsOpened(false)
  }

  return (
    <>
      <MenuWrapper className={isOpened ? 'is-menu-opened' : ''}>
        <BlackOverlay onClick={closeMenu}/>
        <MenuContainer>
        </MenuContainer>
        <MenuButton onClick={toggleMenu}>
          <img src={require('@/assets/icons/icon-menu-white.svg').default} />
          <img src={require('@/assets/icons/icon-menu-black.svg').default} />
        </MenuButton>
      </MenuWrapper>
    </>
  )

}



