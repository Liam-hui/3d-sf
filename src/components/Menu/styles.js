import styled from 'styled-components';

export const MenuButton = styled.div`
    position: absolute;
    top: 2%;
    right: 4%;
    width: 35px;
    height: 35px;
    cursor: pointer;

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: opacity 0.5s ease-in-out; 

        &:nth-child(1) {
            opacity: 1;
            .is-menu-opened & {
                opacity: 0;
            }
        }
        
        &:nth-child(2) {
            opacity: 0;
            .is-menu-opened & {
                opacity: 1;
            }
        }
    }
`;

export const MenuWrapper = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
`

export const MenuContainer = styled.div`
    position: relative;
    width: 500px;
    height: 100%;
    background-color: white;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out; 

    .is-menu-opened & {
        transform: translateX(0);
    }
`

export const BlackOverlay = styled.div`
    position: absolute;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.5s ease-in-out; 
    pointer-events: none;

    .is-menu-opened & {
        opacity: 1;
        pointer-events: auto;
    }
`