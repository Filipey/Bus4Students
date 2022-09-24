import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../hooks/userContext'
import Bus from '../../img/onibusExemplo.jpeg'
import { UserDTO } from '../../schemas'
import { UserService } from '../../services/UserService'

import * as S from './style'

export default function LoginContainer() {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [userDTO, setUserDTO] = useState<UserDTO | null>(null)
  const [error, setError] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChangeCpf = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCpf(e.target.value)
  }

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value)
  }

  const handleValidateUser = () => {
    UserService.validateLogin(userDTO!)
      .then(res => {
        setError(false)
        setUser({
          cpf: res.data.cpf,
          name: res.data.name,
          address: res.data.address,
          role: res.data.role
        })
        user.role === 'STUDENT' ? navigate('/user') : navigate('/admin')
      })
      .catch(() => setError(true))
  }

  function handleLogin() {
    if (cpf && password) {
      handleValidateUser()
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    setUserDTO({ cpf, password })
  }, [cpf, password])

  return (
    <S.Container>
      <S.BusImg src={Bus} />
      <S.Form>
        <S.TitleLogin>Entrar</S.TitleLogin>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          autoFocus
          onChange={handleChangeCpf}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          onChange={handleChangePassword}
        />
        {error && (
          <Typography color="red">Usuário ou senha inválidos</Typography>
        )}
        <Button
          onClick={handleLogin}
          fullWidth
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>

        <S.InfoContainer>
          <S.Info onClick={() => navigate('/register')}>Cadastrar</S.Info>
        </S.InfoContainer>
      </S.Form>
    </S.Container>
  )
}
