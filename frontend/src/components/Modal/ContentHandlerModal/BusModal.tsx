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
import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import { EsconBus, HallBus } from '../../../schemas'
import { isHallBus } from '../../../utils/getType'
import { InfoTextField } from '../../InfoTextField'

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

  const isUserAdmin = user.role === 'ADMIN'

  function userPermission() {
    if (mode === 'view') {
      return true
    }

    if (mode === 'handle' && user.role === 'ADMIN') {
      return false
    }

    return true
  }

  function handleCloseModal() {
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
              disabled={userPermission()}
              fullWidth={true}
              icon={<DirectionsBus />}
            />
            <InfoTextField
              label="Horário de Saída"
              defaultValue={bus.departureTime}
              disabled={userPermission()}
              fullWidth={true}
              icon={<Schedule />}
            />
            {isHallBus(bus) ? (
              <>
                <InfoTextField
                  label="Fornecedor"
                  defaultValue="Prefeitura"
                  disabled={userPermission()}
                  fullWidth={true}
                  icon={<AccountBalance />}
                />
                <InfoTextField
                  label="Motorista"
                  defaultValue={bus.driver}
                  disabled={userPermission()}
                  fullWidth={true}
                  icon={<AccountBox />}
                />
                <InfoTextField
                  label="Limite de Passageiros"
                  defaultValue={bus.passengersLimit.toString()}
                  disabled={userPermission()}
                  fullWidth={true}
                  icon={<Diversity1 />}
                />
              </>
            ) : (
              <>
                <InfoTextField
                  label="Fornecedor"
                  defaultValue="Escon"
                  disabled={userPermission()}
                  fullWidth={true}
                  icon={<Commute />}
                />
                <InfoTextField
                  icon={<Tag />}
                  fullWidth={true}
                  disabled={userPermission()}
                  label="Linha"
                  defaultValue={bus.line.toString()}
                />
              </>
            )}
          </Grid>
        </Grid>

        {mode !== 'view' && (
          <Grid
            container
            sx={{ pt: 2 }}
            spacing={10}
            alignContent="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Button variant="contained" color="info">
                Editar
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  )
}
