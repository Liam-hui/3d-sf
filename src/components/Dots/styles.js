import styled from 'styled-components'

export const DotsContainer = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 2%;
`;

export const Dot = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    * {
        transform: scale(0.8);
        transition: transform 0.4s ease-in-out; 
        .is-focus & {
            transform: scale(1);
        }
    } 

    div {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
`;

export const StyledItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0;
    overflow: hidden;
`;

export const ItemName = styled.div`
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.5s ease-in-out; 

    .is-focus & {
        opacity: 1;
        transform: translateY(0);
    }   
`;

