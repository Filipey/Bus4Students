import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../hooks/userContext'
import Bus from '../../img/onibusExemplo.jpeg'
import { StudentDTO } from '../../schemas'
import { StudentService } from '../../services/StudentService'
import { UserService } from '../../services/UserService'
import * as S from './style'

export default function Register() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const [student, setStudent] = useState<StudentDTO | null>(null)
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(' ')
  const [address, setAddress] = useState('')
  const [enrollment, setEnrollment] = useState('')
  const [error, setError] = useState(false)
  const [invalidData, setInvalidData] = useState(false)
  const [finish, setFinish] = useState(false)

  const handleRegister = async () => {
    await StudentService.insertNewStudent(student!)
      .then(res => {
        if (res.status === 201) {
          UserService.insertNewUser({ cpf, password, isAdmin: false })
          UserService.validateLogin({ cpf, password }).then(res => {
            setUser({
              name: res.data.name,
              address: res.data.address,
              cpf: res.data.cpf,
              role: res.data.role
            })
          })
        }
      })
      .catch(() => setInvalidData(true))
    setFinish(true)
  }

  const validateRegister = () => {
    if (student === null) {
      setError(true)
      return
    }
    if (password !== passwordConfirm) {
      setError(true)
      return
    }

    handleRegister()
  }

  useEffect(() => {
    setStudent({ cpf, name, address, enrollment })
  }, [name, cpf, password])

  return (
    <S.Container>
      <S.BusImg src={Bus} />
      <S.Form>
        <S.TitleLogin>Estudante</S.TitleLogin>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome"
          name="name"
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          onChange={e => setCpf(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="endereco"
          label="Endereço"
          name="endereco"
          onChange={e => setAddress(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="enrollment"
          label="Matrícula"
          name="enrollment"
          onChange={e => setEnrollment(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Insira sua senha"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirme sua senha"
          type="password"
          id="passwordConfirm"
          autoComplete="current-password"
          onChange={e => setPasswordConfirm(e.target.value)}
        />

        <Button
          onClick={validateRegister}
          fullWidth
          variant="contained"
          color="primary"
        >
          Cadastrar
        </Button>
        <S.InfoContainer>
          <S.Info onClick={() => navigate('/login')} href="/login">
            Já é cadastrado? Entrar
          </S.Info>
        </S.InfoContainer>
        {error && <Typography color="red">Senhas não conferem!</Typography>}
        {invalidData && (
          <Typography color="red">CPF já está cadastrado!</Typography>
        )}
        {finish && (
          <Typography color="green">
            Cadastro realizado com sucesso! Volte para a tela de login
          </Typography>
        )}
      </S.Form>
    </S.Container>
  )
}
