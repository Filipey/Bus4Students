import { Container } from '@material-ui/core'
import HeaderAdmin from '../HeaderAdmin'
import * as S from './style'

export function ContainerAdmin() {
  return (
    <S.Container>
      <HeaderAdmin page="Administrador: X" />
      <Container>
        <h1>sdsd</h1>
      </Container>
    </S.Container>
  )
}
