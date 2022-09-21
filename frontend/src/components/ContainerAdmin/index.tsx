import * as S from './style';
import HeaderAdmin from '../HeaderAdmin';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core';

export function ContainerAdmin() {
    return (
        <S.Container>

            <HeaderAdmin page='Administrador: X' />
            <Container>
                <h1>sdsd</h1>
            </Container>

        </S.Container>

    );
}