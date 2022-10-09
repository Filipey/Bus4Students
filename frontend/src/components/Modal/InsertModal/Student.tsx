import { Close, Home, Person, Security, VpnKey } from '@material-ui/icons'
import { Key, Numbers } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { useEffect, useState } from 'react'
import { StudentService } from '../../../services/StudentService'
import { UserService } from '../../../services/UserService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface InsertStudentModalProps {
  state: boolean
  setState(state: boolean): void
}

export function InsertStudentModal({
  state,
  setState
}: InsertStudentModalProps) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [address, setAddress] = useState('')
  const [enrollment, setEnrollment] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [submit, setSubmit] = useState(false)
  const [badRequest, setBadRequest] = useState(false)

  const isAvailableToSubmit = () =>
    name !== '' &&
    cpf.length === 11 &&
    address !== '' &&
    enrollment !== '' &&
    password !== '' &&
    passwordConfirmation !== '' &&
    password === passwordConfirmation

  const handleSubmit = () => {
    StudentService.insertNewStudent({ name, cpf, address, enrollment }).then(
      res => (res.status !== 201 ? setBadRequest(true) : null)
    )
    UserService.insertNewUser({ cpf, password, isAdmin: false })
    setSubmit(true)
  }

  const handleCancel = () => {
    setName('')
    setCpf('')
    setAddress('')
    setEnrollment('')
    setSubmit(false)
    setState(false)
  }

  useEffect(() => {
    isAvailableToSubmit()
  }, [name, cpf, address, enrollment])

  return (
    <Dialog open={state} scroll="body" fullWidth>
      <DialogTitle color="#03a9f4">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>Novo Estudante</Grid>
          <Grid item>
            <IconButton sx={{ size: 'small' }} onClick={handleCancel}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" item sx={{ pt: 2 }}>
          <InfoTextField
            label="Nome"
            defaultValue={name}
            fullWidth={true}
            icon={<Person />}
            onChange={e => setName(e.target.value)}
          />
          <InfoTextField
            label="CPF"
            defaultValue={cpf}
            fullWidth={true}
            icon={<Security />}
            onChange={e => setCpf(e.target.value)}
          />
          <InfoTextField
            label="Endereço"
            defaultValue={address}
            fullWidth
            icon={<Home />}
            onChange={e => setAddress(e.target.value)}
          />
          <InfoTextField
            label="Matrícula"
            defaultValue={enrollment}
            fullWidth
            icon={<Numbers />}
            onChange={e => setEnrollment(e.target.value)}
          />
          <InfoTextField
            label="Senha"
            defaultValue={password}
            fullWidth
            icon={<Key />}
            onChange={e => setPassword(e.target.value)}
          />
          <InfoTextField
            label="Confirmação de Senha"
            defaultValue={enrollment}
            fullWidth
            icon={<VpnKey />}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          {submit && (
            <WarningField
              title="Cadastro realizado com sucesso!"
              severity="success"
              message={`O estudante ${name} de CPF ${cpf} foi cadastrado com sucesso!`}
            />
          )}
          {!submit && isAvailableToSubmit() && (
            <Grid
              container
              sx={{ pt: 2 }}
              spacing={10}
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          )}
          {badRequest && !submit && (
            <WarningField
              title="Entrada de dados inválida!"
              severity="error"
              message={`Este CPF já consta na base de dados! Verifique a integridade das entradas.`}
            />
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
