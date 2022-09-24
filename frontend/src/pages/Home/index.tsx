import { useState, useEffect } from 'react'
import * as S from './style'

import Bus from '../../img/onibusExemplo.jpeg'

export default function Home() {

    const [totalStudents, setTotalStudents] = useState<number>(0)

    return (

        <S.Container>
            <S.Title>Bus4Student</S.Title>
            <S.TitleDescription>Atendendo um total de {totalStudents} estudantes!</S.TitleDescription>
            <S.BusImg src={Bus} />
            <S.ContainerButton>
                <a href="/login">Entrar</a>
                <a href="/register">Registrar</a>
                <a href="/user">Usuario</a>
                <a href="/admin">Administrador</a>
            </S.ContainerButton>

        </S.Container>
    )
}