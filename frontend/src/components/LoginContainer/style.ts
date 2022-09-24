import styled from 'styled-components'

export const Container = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

export const Form = styled.form`
  margin: 5vh;
`

export const BusImg = styled.img`
  width: auto;
  margin: 5vh;
  max-width: 60%;
  border-radius: 1vh;

  @media (max-width: 800px) {
    max-width: 80%;
  }
`

export const TitleLogin = styled.p`
  text-align: center;
  font-size: 2em;
`
export const InfoContainer = styled.div`
  justify-content: space-between;
  padding: 1vh;
  display: flex;
`
export const Info = styled.a`
  text-decoration: none;
  cursor: pointer;
`
