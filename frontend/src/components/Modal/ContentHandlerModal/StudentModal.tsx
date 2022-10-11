import {
  AccountBalance,
  ArrowForward,
  Close,
  Commute,
  DirectionsBus,
  Domain,
  Home,
  Person,
  School,
  Security
} from '@material-ui/icons'
import { Numbers } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { Student } from '../../../schemas'
import { StudentService } from '../../../services/StudentService'
import { isHallBus } from '../../../utils/getType'
import { InfoAccorion } from '../../Accordion'
import { InfoTextField } from '../../InfoTextField'
import { SchoolsTransferList } from '../../TransferList/SchoolsTransferList'
import { WarningField } from '../../WarningField'

interface StudentDetailsModalProps {
  student: Student
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function StudentDetailsModal({
  student,
  state,
  setState,
  index
}: StudentDetailsModalProps) {
  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Estudante {student.cpf}</Grid>
          <Grid item>
            <IconButton onClick={handleCloseModal} size="small">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            <InfoTextField
              label="Nome"
              defaultValue={student.name}
              disabled={true}
              fullWidth={true}
              icon={<Person />}
            />
            <InfoTextField
              label="CPF"
              defaultValue={student.cpf}
              disabled={true}
              fullWidth={true}
              icon={<Security />}
            />
            <InfoTextField
              label="Endereço"
              defaultValue={student.address}
              disabled={true}
              fullWidth={true}
              icon={<Home />}
            />
            <InfoTextField
              label="Matrícula"
              defaultValue={student.enrollment}
              fullWidth={true}
              disabled={true}
              icon={<Numbers />}
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
                  Este estudante não está matriculado em nenhuma Instituição de
                  Ensino
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
                      <ArrowForward
                        style={{ width: '20px' }}
                        htmlColor="#03a9f4"
                      />
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
                  Este estudante não está alocado a nenhum Transporte Escolar
                </Typography>
              )}
            </InfoAccorion>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

interface HandleStudentModalProps {
  student: Student
  state: boolean[]
  setState(state: boolean[]): void
  index: number
  mode: 'edit' | 'delete' | 'delegate'
}

export function HandleEditStudentModal({
  student,
  state,
  setState,
  index,
  mode
}: HandleStudentModalProps) {
  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }
  const [name, setName] = useState(student.name)
  const [cpf, setCpf] = useState(student.cpf)
  const [address, setAddress] = useState(student.address)
  const [enrollment, setEnrollment] = useState(student.enrollment)
  const [changes, setChanges] = useState([])
  const [changesWarning, setChangesWarning] = useState(false)
  const [successWarning, setSuccessWarning] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState(false)
  const [showButton, setShowButton] = useState(true)

  function hasChanged() {
    if (name !== student.name) {
      changes.find(c => c === 'Nome') ? '' : setChanges([...changes, 'Nome'])
    }
    if (cpf !== student.cpf) {
      changes.find(c => c === 'CPF') ? '' : setChanges([...changes, 'CPF'])
    }
    if (address !== student.address) {
      changes.find(c => c === 'Endereço')
        ? ''
        : setChanges([...changes, 'Endereço'])
    }
    if (enrollment !== student.enrollment) {
      changes.find(c => c === 'Matrícula')
        ? ''
        : setChanges([...changes, 'Matrícula'])
    }
  }

  const disableInput = mode === 'edit' ? false : true

  function handleSubmitChanges() {
    if (name === '' || cpf === '' || address === '' || enrollment === '') {
      setError(true)
      return
    } else if (cpf.length < 11) {
      setError(true)
      return
    }

    StudentService.updateStudent(student.cpf, {
      cpf,
      name,
      address,
      enrollment
    })
    setSuccessWarning(true)
    setChangesWarning(false)
    setChanges([])
  }

  function handleDelete() {
    StudentService.deleteStudent(student.cpf)
    setConfirmDelete(false)
    setSuccessWarning(true)
    setShowButton(false)
  }

  useEffect(() => {
    hasChanged()
  }, [name, cpf, address, enrollment])

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Estudante {student.cpf}</Grid>
          <Grid item>
            <IconButton onClick={handleCloseModal} size="small">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            <InfoTextField
              label="Nome"
              defaultValue={student.name}
              disabled={disableInput}
              fullWidth
              icon={<Person />}
              onChange={e => setName(e.target.value)}
            />
            <InfoTextField
              label="CPF"
              defaultValue={student.cpf}
              disabled={disableInput}
              fullWidth
              icon={<Security />}
              onChange={e => setCpf(e.target.value)}
            />
            <InfoTextField
              label="Endereço"
              defaultValue={student.address}
              disabled={disableInput}
              fullWidth
              icon={<Home />}
              onChange={e => setAddress(e.target.value)}
            />
            <InfoTextField
              label="Matrícula"
              defaultValue={student.enrollment}
              disabled={disableInput}
              fullWidth
              icon={<Numbers />}
              onChange={e => setEnrollment(e.target.value)}
            />
            {mode === 'delegate' ? (
              <SchoolsTransferList student={student} />
            ) : (
              <>
                <InfoAccorion title="Instituições de Ensino">
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
                      Este estudante não está matriculado em nenhuma Instituição
                      de Ensino
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
                      Este estudante não está alocado a nenhum Transporte
                      Escolar
                    </Typography>
                  )}
                </InfoAccorion>
              </>
            )}
            {mode === 'delete' && showButton && (
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={() => setConfirmDelete(true)}
                >
                  Deletar
                </Button>
              </Grid>
            )}
            {changes.length > 0 && (
              <Grid item sx={{ mt: 1 }}>
                <Button
                  onClick={() => setChangesWarning(true)}
                  variant="contained"
                  color="success"
                >
                  Salvar
                </Button>
              </Grid>
            )}
            {changesWarning && (
              <>
                <WarningField
                  severity="warning"
                  title="Tem certeza?"
                  message={`Os seguintes campos foram alterados: ${changes.map(
                    change => change
                  )}`}
                />
                <Button
                  onClick={handleSubmitChanges}
                  variant="contained"
                  color="inherit"
                >
                  Confirmar
                </Button>
              </>
            )}
            {successWarning && (
              <WarningField
                severity="success"
                title="Mudanças realizadas com sucesso"
                message="Volte para a página para observar as mudanças"
              />
            )}
            {confirmDelete && (
              <>
                <WarningField
                  severity="warning"
                  title="Tem certeza?"
                  message={`O estudante ${student.name} de CPF ${student.cpf} será deletado`}
                />
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleDelete}
                >
                  Confirmar
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
