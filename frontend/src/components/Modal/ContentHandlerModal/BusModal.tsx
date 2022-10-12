import {
  AccountBalance,
  AccountBox,
  Close,
  Commute,
  DirectionsBus,
  Person,
  Schedule,
  Security
} from '@material-ui/icons'
import { Diversity1, Tag } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { EsconBus, HallBus, Student } from '../../../schemas'
import { BusService } from '../../../services/BusService'
import { formatCpf } from '../../../utils/formatter'
import { isEsconBus, isHallBus } from '../../../utils/getType'
import { InfoTextField } from '../../InfoTextField'
import { BusTransferList } from '../../TransferList'
import { WarningField } from '../../WarningField'

interface BusContentProps {
  bus: EsconBus | HallBus
  mode: 'view' | 'handle'
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function BusContentModal({
  bus,
  mode,
  state,
  setState,
  index
}: BusContentProps) {
  const { user } = useContext(UserContext)
  const [departureTime, setDepartureTime] = useState(bus.departureTime)
  const [driver, setDriver] = useState(isHallBus(bus) ? bus.driver : '')
  const [passengersLimit, setPassengersLimit] = useState(
    isHallBus(bus) ? bus.passengersLimit : 0
  )
  const [line, setLine] = useState(isHallBus(bus) ? 0 : bus.line)
  const [permission, setPermission] = useState(userPermission())
  const [changes, setChanges] = useState<string[]>([])
  const [changesWarning, setChangesWarning] = useState(false)
  const [successWarning, setSuccessWarning] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  function userPermission() {
    if (mode === 'view') {
      return true
    }

    if (mode === 'handle' && user.role === 'ADMIN') {
      return false
    }

    return true
  }

  function hasChanged() {
    if (departureTime !== bus.departureTime) {
      changes.find(c => c === 'Horário de Saída')
        ? ''
        : setChanges([...changes, 'Horário de Saída'])
    }
    if (isHallBus(bus)) {
      if (driver !== bus.driver) {
        changes.find(c => c === 'Motorista')
          ? ''
          : setChanges([...changes, 'Motorista'])
      }
      if (passengersLimit !== bus.passengersLimit) {
        changes.find(c => c === 'Limite de Passageiros')
          ? ''
          : setChanges([...changes, 'Limite de Passageiros'])
      }
    }
    if (isEsconBus(bus)) {
      if (line !== bus.line) {
        changes.find(c => c === 'Linha')
          ? ''
          : setChanges([...changes, 'Linha'])
      }
    }
  }

  function handleSubmitChanges() {
    isHallBus(bus)
      ? BusService.updateHallBus(bus.plate, {
          driver,
          departureTime,
          passengersLimit
        })
      : BusService.updateEsconBus(bus.plate, { line, departureTime })
    setChangesWarning(false)
    setSuccessWarning(true)
  }

  function handleDelete() {
    isHallBus(bus)
      ? BusService.deleteHallBus(bus.plate)
      : BusService.deleteEsconBus(bus.plate)
    setChangesWarning(false)
    setSuccessWarning(true)
  }

  useEffect(() => {
    hasChanged()
  }, [departureTime, driver, passengersLimit, line])

  const handleCloseModal = () => {
    setPermission(true)
    setDepartureTime(bus.departureTime)
    setDriver(isHallBus(bus) ? bus.driver : '')
    setPassengersLimit(isHallBus(bus) ? bus.passengersLimit : 0)
    setLine(isHallBus(bus) ? 0 : bus.line)
    setChanges([])
    setChangesWarning(false)
    setSuccessWarning(false)
    setConfirmDelete(false)
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      onClose={handleCloseModal}
      fullWidth
      open={state[index]}
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Transporte {bus.plate}</Grid>
          <Grid item>
            <IconButton size="small" onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            <InfoTextField
              label="Placa"
              defaultValue={bus.plate}
              disabled={true}
              fullWidth={true}
              icon={<DirectionsBus />}
            />
            <InfoTextField
              label="Horário de Saída"
              defaultValue={bus.departureTime}
              disabled={permission}
              fullWidth={true}
              icon={<Schedule />}
              onChange={e => setDepartureTime(e.target.value)}
            />
            {isHallBus(bus) ? (
              <>
                <InfoTextField
                  label="Fornecedor"
                  defaultValue="Prefeitura"
                  disabled={true}
                  fullWidth={true}
                  icon={<AccountBalance />}
                />
                <InfoTextField
                  label="Motorista"
                  defaultValue={bus.driver}
                  disabled={permission}
                  fullWidth={true}
                  icon={<AccountBox />}
                  onChange={e => setDriver(e.target.value)}
                />
                <InfoTextField
                  label="Limite de Passageiros"
                  defaultValue={bus.passengersLimit.toString()}
                  disabled={permission}
                  fullWidth={true}
                  icon={<Diversity1 />}
                  type="number"
                  onChange={e => {
                    e.preventDefault()
                    setPassengersLimit(Number(e.target.value))
                  }}
                />
              </>
            ) : (
              <>
                <InfoTextField
                  label="Fornecedor"
                  defaultValue="Escon"
                  disabled={true}
                  fullWidth={true}
                  icon={<Commute />}
                />
                <InfoTextField
                  icon={<Tag />}
                  fullWidth={true}
                  disabled={permission}
                  label="Linha"
                  defaultValue={bus.line.toString()}
                  onChange={e => setLine(Number(e.target.value))}
                />
              </>
            )}
          </Grid>
        </Grid>

        {mode !== 'view' && (
          <>
            <Grid
              container
              sx={{ pt: 2 }}
              spacing={10}
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  onClick={() => setPermission(!permission)}
                  variant="contained"
                  color="info"
                >
                  Editar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setConfirmDelete(true)}
                  variant="contained"
                  color="error"
                >
                  Deletar
                </Button>
              </Grid>
              {changes.length > 0 && (
                <Grid item>
                  <Button
                    onClick={() => setChangesWarning(true)}
                    variant="contained"
                    color="success"
                  >
                    Salvar
                  </Button>
                </Grid>
              )}
            </Grid>
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
                  message={`O transporte de placa ${bus.plate} será deletado`}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface DelegateBusModalProps {
  student: Student
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function DelegateBusModal({
  student,
  index,
  state,
  setState
}: DelegateBusModalProps) {
  const [option, setOption] = useState('Prefeitura')

  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value)
  }

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Estudante {formatCpf(student.cpf)}</Grid>
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
            <FormControl>
              <FormLabel>Fornecedor </FormLabel>
              <RadioGroup onChange={handleChange} value={option} row>
                <FormControlLabel
                  label="Prefeitura"
                  control={<Radio />}
                  value="Prefeitura"
                />
                <FormControlLabel
                  label="Escon"
                  control={<Radio />}
                  value="Escon"
                />
              </RadioGroup>
            </FormControl>
            <BusTransferList student={student} option={option} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
