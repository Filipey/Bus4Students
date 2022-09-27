import {
  AccountBalance,
  AccountBox,
  Close,
  Commute,
  DirectionsBus,
  Schedule
} from '@material-ui/icons'
import { Diversity1, Tag } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { EsconBus, HallBus } from '../../../schemas'
import { isEsconBus, isHallBus } from '../../../utils/getType'
import { InfoTextField } from '../../InfoTextField'
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
  const [plate, setPlate] = useState(bus.plate)
  const [departureTime, setDepartureTime] = useState(bus.departureTime)
  const [driver, setDriver] = useState(isHallBus(bus) ? bus.driver : '')
  const [passengersLimit, setPassengersLimit] = useState(
    isHallBus(bus) ? bus.passengersLimit : 0
  )
  const [line, setLine] = useState(isHallBus(bus) ? 0 : bus.line)
  const [permission, setPermission] = useState(userPermission())
  const [changes, setChanges] = useState<string[]>([])
  const [changesWarning, setChangesWarning] = useState(false)

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
    if (plate !== bus.plate) {
      changes.find(c => c === 'Placa')
        ? setChanges(changes)
        : setChanges([...changes, 'Placa'])
    }
    if (departureTime !== bus.departureTime) {
      changes.find(c => c === 'Horário de Saída')
        ? setChanges(changes)
        : setChanges([...changes, 'Horário de Saída'])
    }
    if (isHallBus(bus)) {
      if (driver !== bus.driver) {
        changes.find(c => c === 'Motorista')
          ? setChanges(changes)
          : setChanges([...changes, 'Motorista'])
      }
      if (passengersLimit !== passengersLimit) {
        changes.find(c => c === 'Limite de Passageiros')
          ? setChanges(changes)
          : setChanges([...changes, 'Limite de Passageiros'])
      }
    }
    if (isEsconBus(bus)) {
      if (line !== bus.line) {
        changes.find(c => c === 'Linha')
          ? setChanges(changes)
          : setChanges([...changes, 'Linha'])
      }
    }
  }

  useEffect(() => {
    hasChanged()
    console.log(changes)
  }, [plate, departureTime, driver, passengersLimit, line])

  function handleCloseModal() {
    setPermission(true)
    setPlate(bus.plate)
    setDepartureTime(bus.departureTime)
    setDriver(isHallBus(bus) ? bus.driver : '')
    setPassengersLimit(isHallBus(bus) ? bus.passengersLimit : 0)
    setLine(isHallBus(bus) ? 0 : bus.line)
    setChanges([])
    setChangesWarning(false)
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
              disabled={permission}
              fullWidth={true}
              icon={<DirectionsBus />}
              onChange={e => setPlate(e.target.value)}
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
                  onChange={e => setPassengersLimit(Number(e.target.value))}
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
                <Button variant="contained" color="error">
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
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
