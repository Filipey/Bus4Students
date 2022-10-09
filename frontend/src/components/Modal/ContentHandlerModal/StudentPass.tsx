import { MenuItem } from '@material-ui/core'
import { Close, Person, School, Security } from '@material-ui/icons'
import { CalendarMonth } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { Student, StudentPass } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { StudentPassService } from '../../../services/StudentPassService'
import { formatCpf, formatSubmitDate } from '../../../utils/formatter'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface StudentPassModalProps {
  state: boolean[]
  setState(state: boolean[]): void
  index: number
  studentCpf: string
}

export function StudentPassModal({
  state,
  setState,
  index,
  studentCpf
}: StudentPassModalProps) {
  const { user } = useContext(UserContext)
  const [names, setNames] = useState<string[]>([])
  const [school, setSchool] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [submit, setSubmit] = useState(false)

  const handleChangeSchool = (e: SelectChangeEvent) => {
    setSchool(e.target.value as string)
  }

  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
    setSchool('')
    setExpirationDate('')
  }

  const handleSubmit = () => {
    const formattedDate = formatSubmitDate(expirationDate)
    StudentPassService.createStudentPass(
      { expirationDate: formattedDate, schoolName: school, studentCpf },
      user.cpf
    ).then(res => (res.status === 201 ? setSubmit(true) : null))
  }

  const isValidToSubmit = school !== '' && expirationDate !== ''

  useEffect(() => {
    SchoolService.getAllSchoolsNames().then(res => setNames(res.data))
  }, [])

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Nova Carteira de Estudante</Grid>
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
            <FormControl>
              <InputLabel>Instituição de Ensino</InputLabel>
              <Select
                value={school}
                label="Instituição de Ensino"
                onChange={handleChangeSchool}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InfoTextField
              fullWidth
              icon={<CalendarMonth />}
              type="date"
              label="Data de Expiração"
              onChange={e => setExpirationDate(e.target.value)}
            />
            <InfoTextField
              fullWidth
              icon={<Security />}
              label="CPF"
              disabled
              value={studentCpf}
            />
            {isValidToSubmit && (
              <Button onClick={handleSubmit} variant="contained">
                Salvar
              </Button>
            )}
            {submit && (
              <WarningField
                title="Cadastro realizado com sucesso!"
                severity="success"
                message="Carteira de Transporte cadastrada com sucesso!"
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

interface StudentPassDetailsModalProps {
  state: boolean[]
  setState(state: boolean[]): void
  index: number
  student: Student
  pass: StudentPass
  mode: 'edit' | 'delete' | 'view'
}

export function StudentPassDetailsModal({
  state,
  setState,
  student,
  index,
  pass,
  mode
}: StudentPassDetailsModalProps) {
  const [name, setName] = useState(pass.schoolName)
  const [expirationDate, setExpirationDate] = useState<string | Date>(
    pass.expirationDate
  )
  const [schoolOptions, setSchoolOptions] = useState([])
  const [changes, setChanges] = useState([])
  const [submit, setSubmit] = useState(false)
  const [successWarning, setSuccessWarning] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const disableFields = mode !== 'edit'

  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
    setName(pass.schoolName)
    setExpirationDate(pass.expirationDate)
  }

  const handleChangeSchool = (e: SelectChangeEvent) => {
    setName(e.target.value as string)
  }

  function hasChanged() {
    if (name !== pass.schoolName) {
      changes.find(c => c === 'Nome') ? null : setChanges([...changes, 'Nome'])
    }
    if (expirationDate !== pass.expirationDate) {
      changes.find(c => c === 'Data de Expiração')
        ? null
        : setChanges([...changes, 'Data de Expiração'])
    }
  }

  function handleSubmitChanges() {
    const submitDate = new Date(expirationDate)

    StudentPassService.updatePass(
      { expirationDate: submitDate, schoolName: name, studentCpf: student.cpf },
      pass.id
    ).then(res => (res.status === 204 ? setSuccessWarning(true) : null))
    setChanges([])
    setSubmit(false)
  }

  function handleConfirmDelete() {
    StudentPassService.deleteStudentPass(pass.id).then(res =>
      res.status === 204 ? setSuccessWarning(true) : null
    )
    setConfirmDelete(false)
  }

  useEffect(() => {
    SchoolService.getAllSchoolsNames().then(res => setSchoolOptions(res.data))
  }, [])

  useEffect(() => {
    hasChanged()
  }, [name, expirationDate])

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Nova Carteira de Estudante</Grid>
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
            {mode === 'edit' ? (
              <FormControl>
                <InputLabel>Instituição de Ensino</InputLabel>
                <Select
                  disabled={disableFields}
                  value={name}
                  label="Instituição de Ensino"
                  onChange={handleChangeSchool}
                >
                  {schoolOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <InfoTextField
                icon={<School />}
                label="Instituição de Ensino"
                fullWidth
                disabled={disableFields}
                value={pass.schoolName}
              />
            )}

            <InfoTextField
              fullWidth
              icon={<CalendarMonth />}
              type="date"
              label="Data de Expiração"
              disabled={disableFields}
              onChange={e =>
                setExpirationDate(e.target.value as unknown as Date)
              }
              value={expirationDate}
            />
            <InfoTextField
              fullWidth
              icon={<Security />}
              label="CPF"
              disabled
              value={formatCpf(student.cpf)}
            />
            <InfoTextField
              fullWidth
              icon={<Person />}
              label="Nome"
              disabled
              value={student.name}
            />
            {mode === 'delete' && !successWarning && (
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setConfirmDelete(true)}
                >
                  Deletar
                </Button>
              </Grid>
            )}
            {confirmDelete && (
              <>
                <WarningField
                  title="Tem certeza?"
                  message={`A Carteira de Transporte de ID: ${
                    pass.id
                  }, proprietária pelo estudante ${
                    pass.owner.name
                  }, de CPF: ${formatCpf(pass.owner.cpf)} será deletada`}
                  severity="warning"
                />
                <Grid item>
                  <Button onClick={handleConfirmDelete} variant="contained">
                    Confirmar
                  </Button>
                </Grid>
              </>
            )}
            {changes.length > 0 && (
              <Grid item>
                <Button
                  onClick={() => setSubmit(true)}
                  variant="contained"
                  color="success"
                >
                  Salvar
                </Button>
              </Grid>
            )}
            {submit && (
              <>
                <WarningField
                  title="Tem certeza?"
                  message={`Os seguintes campos foram alterados: ${changes.map(
                    c => c
                  )}`}
                  severity="warning"
                />
                <Grid item>
                  <Button onClick={handleSubmitChanges} variant="contained">
                    Confirmar
                  </Button>
                </Grid>
              </>
            )}
            {successWarning && (
              <WarningField
                title="Operação realizada com sucesso!"
                message="Atualize a página para análisar os resultados!"
                severity="success"
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
