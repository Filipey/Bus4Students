import {
  AccountBalance,
  ArrowForward,
  Commute,
  DirectionsBus,
  Domain,
  Home,
  Person,
  School,
  Security
} from '@material-ui/icons'
import { Button, Grid, Paper, Skeleton, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { User } from '../../../hooks/userContext'
import { Student } from '../../../schemas'
import { StudentService } from '../../../services/StudentService'
import { UserService } from '../../../services/UserService'
import { isHallBus } from '../../../utils/getType'
import { InfoAccorion } from '../../Accordion'
import { InfoTextField } from '../../InfoTextField'
import { BreadCrumbStep, TableTitle } from '../Title'

interface UserTableProps {
  actualUser: 'student' | 'admin'
}

export function UserTable({ actualUser }: UserTableProps) {
  const user: User = JSON.parse(window.sessionStorage.getItem('USER'))
  const [student, setStudent] = useState<Student>(undefined)
  const [admin, setAdmin] = useState<User>(undefined)
  const [name, setName] = useState(user.name)
  const [cpf, setCpf] = useState(user.cpf)
  const [address, setAddress] = useState(user.address)
  const [editMode, setEditMode] = useState(false)

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: user.role === 'ADMIN' ? '/admin' : '/user'
    },
    {
      title: 'Meus Dados',
      url: user.role === 'ADMIN' ? '/admin/me' : '/user/me'
    }
  ]

  const isAvailableToSubmit =
    name !== '' &&
    cpf !== '' &&
    cpf.length === 11 &&
    address !== '' &&
    cpf !== ''

  useEffect(() => {
    actualUser === 'student'
      ? StudentService.getStudentByCpf(user.cpf).then(res =>
          setStudent(res.data)
        )
      : UserService.getDataByCpf(user.cpf).then(res => setAdmin(res.data))
  }, [])

  const handleSubmitChanges = () => {
    if (!isAvailableToSubmit) {
      return
    }
    if (actualUser === 'student') {
      StudentService.updateStudent(user.cpf, {
        cpf,
        name,
        address,
        enrollment: student.enrollment
      })
    }
  }

  return (
    <TableTitle title="Meus Dados" steps={steps}>
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Paper>
          {!user && <Skeleton />}
          {student && (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container flexDirection="column" item sx={{ p: 2 }}>
                <InfoTextField
                  label="Nome"
                  defaultValue={name}
                  fullWidth
                  disabled={!editMode}
                  icon={<Person />}
                  onChange={e => setName(e.target.value)}
                />
                <InfoTextField
                  label="CPF"
                  defaultValue={cpf}
                  fullWidth
                  disabled={!editMode}
                  icon={<Security />}
                  onChange={e => setCpf(e.target.value)}
                />
                <InfoTextField
                  label="Endereço"
                  defaultValue={address}
                  fullWidth
                  disabled={!editMode}
                  icon={<Home />}
                  onChange={e => setAddress(e.target.value)}
                />
                <InfoAccorion title="Insituições de Ensino">
                  {student.schools.length !== 0 ? (
                    student.schools.map(school => (
                      <Fragment key={school.name}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <InfoTextField
                            label="Nome"
                            defaultValue={school.name}
                            disabled
                            icon={<Domain />}
                          />
                          <ArrowForward htmlColor="#03a9f4" />
                          <InfoTextField
                            label="Campus"
                            defaultValue={school.campus}
                            disabled
                            icon={<School />}
                          />
                        </Grid>
                      </Fragment>
                    ))
                  ) : (
                    <Typography>
                      Você não está matriculado em nenhuma Instituição de Ensino
                    </Typography>
                  )}
                </InfoAccorion>
                <InfoAccorion title="Transportes Utilizados">
                  {student.buses.length !== 0 ? (
                    student.buses.map(bus => (
                      <Fragment key={bus.plate}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <InfoTextField
                            label="Placa"
                            defaultValue={bus.plate}
                            disabled={true}
                            icon={<DirectionsBus />}
                          />
                          <ArrowForward htmlColor="#03a9f4" />
                          {isHallBus(bus) ? (
                            <InfoTextField
                              label="Fornecedor"
                              defaultValue="Prefeitura"
                              disabled={true}
                              icon={<AccountBalance />}
                            />
                          ) : (
                            <InfoTextField
                              label="Fornecedor"
                              defaultValue="Escon"
                              disabled={true}
                              icon={<Commute />}
                            />
                          )}
                        </Grid>
                      </Fragment>
                    ))
                  ) : (
                    <Typography>
                      Você não está alocado a nenhum Transporte Escolar
                    </Typography>
                  )}
                </InfoAccorion>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1
                  }}
                  item
                >
                  <Button
                    onClick={() => setEditMode(!editMode)}
                    variant="contained"
                    color="info"
                  >
                    Editar
                  </Button>
                  {editMode && (
                    <Button
                      onClick={handleSubmitChanges}
                      variant="contained"
                      color="success"
                    >
                      Salvar
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
          {admin && (
            <Grid container justifyContent="space-between" alignItems="center">
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
                  fullWidth={true}
                  icon={<Home />}
                  onChange={e => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </TableTitle>
  )
}
