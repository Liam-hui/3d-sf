import styled from 'styled-components';

export const DotsContainer = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 2%;
`;

export const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: black;
    margin-right: 12px;
    transform: scale(0.8);
    transition: transform 0.5s ease-in-out; 
    cursor: pointer;

    .is-focus & {
        transform: scale(1);
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

