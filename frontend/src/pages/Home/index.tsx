import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentService } from '../../services/StudentService'
import * as S from './style'

import Bus from '../../img/onibusExemplo.jpeg'
import { getUserStorage } from '../../utils/userSession'

export default function Home() {
  const [totalStudents, setTotalStudents] = useState(0)
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    const storedUser = getUserStorage()
    if (storedUser === null) {
      navigate('/login')
      return
    }

    storedUser.role === 'STUDENT' ? navigate('/user') : navigate('/admin')
  }
  const handleGoToRegister = () => navigate('/register')

  useEffect(() => {
    StudentService.getTotalStudents().then(res => {
      setTotalStudents(res.data)
    })
  }, [])

  return (
    <S.Container>
      <S.Title>Bus4Students</S.Title>
      <S.TitleDescription>
        Atendendo um total de {totalStudents} estudantes!
      </S.TitleDescription>
      <S.BusImg src={Bus} />
      <S.ContainerButton>
        <a onClick={handleGoToLogin}>Entrar</a>
        <a onClick={handleGoToRegister}>Registrar</a>
      </S.ContainerButton>
    </S.Container>
  )
}
