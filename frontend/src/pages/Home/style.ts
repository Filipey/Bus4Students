import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;

`

export const ContainerButton = styled.div`
    margin-top: 30px;

    a {

        text-decoration: none;
        text-transform: uppercase;
        padding: 20px;
        color: #fff;
        background: #3f51b5;
        border-radius: 10px;
        margin: 10px;

    }

    a:hover {
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
    }
`

export const Title = styled.h1`
    margin-top: 50px;
    text-align: center;
    font-size: 7em;

    @media(max-width: 1024px) {
        font-size: 3.5em;
    }
    /* font-size: 50px auto; */
`

export const TitleDescription = styled.p`
    margin-top: 30px;
    font-size: 1.4em;
`

export const BusImg = styled.img`
    width: auto;
    margin: 5vh;
    max-width: 50%;
    border-radius: 1vh;

    @media(max-width: 800px) {
        max-width: 80%;
    }

    @media(max-width: 600px) {
        max-width: 70%;
    }
`