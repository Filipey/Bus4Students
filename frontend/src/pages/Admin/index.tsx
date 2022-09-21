import HeaderAdmin from '../../components/HeaderAdmin'
import { ContainerAdmin } from '../../components/ContainerAdmin'

import * as S from './style';

export default function Admin() {
    return (
        <S.Container>
            <header>
                <HeaderAdmin page='Página Inicial - Administrador' />
            </header>

            <body>
                <ContainerAdmin />
            </body>

            <footer>

            </footer>
        </S.Container>
    )
}