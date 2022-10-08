import { AccountBox, Close, DirectionsBus, Schedule } from '@material-ui/icons'
import { Diversity1, Tag } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField
} from '@mui/material'
import { useEffect, useState } from 'react'
import { BusService } from '../../../services/BusService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface InsertBusModalProps {
  state: boolean
  setState(state: boolean): void
}

export function InsertBusModal({ state, setState }: InsertBusModalProps) {
  const [provider, setProvider] = useState<string | null>(null)
  const [plate, setPlate] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [driver, setDriver] = useState('')
  const [passengersLimit, setPassengersLimit] = useState<number | null>(null)
  const [line, setLine] = useState<number | null>(null)
  const [submit, setSubmit] = useState(false)
  const [badRequest, setBadRequest] = useState(false)

  const handleSubmit = () => {
    provider === 'Prefeitura'
      ? BusService.insertNewHallBus({
          plate,
          departureTime,
          passengersLimit,
          driver
        })
          .then(res =>
            res.status === 201 ? setSubmit(true) : setBadRequest(true)
          )
          .catch(res => setBadRequest(true))
      : BusService.createEsconBus({ plate, departureTime, line })
          .then(res =>
            res.status === 201 ? setSubmit(true) : setBadRequest(true)
          )
          .catch(res => setBadRequest(true))
  }

  useEffect(() => {
    areFieldsAcceptable()
  }, [provider, plate, departureTime, driver, passengersLimit])

  const handleCancel = () => {
    setProvider(null)
    setPlate('')
    setDepartureTime('')
    setDriver('')
    setPassengersLimit(null)
    setLine(null)
    setSubmit(false)
    setBadRequest(false)
    setState(false)
  }

  const areFieldsAcceptable = () => {
    if (provider === 'Prefeitura') {
      return (
        plate !== '' &&
        departureTime !== '' &&
        driver !== '' &&
        passengersLimit !== null
      )
    } else if (provider === null) {
      return false
    } else {
      return plate !== '' && departureTime !== '' && line !== null
    }
  }

  return (
    <Dialog open={state} scroll="body" fullWidth>
      <DialogTitle color="#03a9f4">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>Novo Transporte</Grid>
          <Grid item>
            <IconButton sx={{ size: 'small' }} onClick={handleCancel}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" item sx={{ pt: 2 }}>
          <Autocomplete
            options={['Prefeitura', 'Escon']}
            value={provider}
            onChange={(e, value) => setProvider(value)}
            renderInput={params => (
              <TextField
                {...params}
                sx={{ pb: '20px' }}
                required
                label="Fornecedor"
              />
            )}
          />

          <InfoTextField
            label="Placa"
            defaultValue={plate}
            fullWidth={true}
            icon={<DirectionsBus />}
            onChange={e => setPlate(e.target.value)}
          />
          <InfoTextField
            label="Horário de Saída"
            defaultValue={departureTime}
            fullWidth={true}
            icon={<Schedule />}
            onChange={e => setDepartureTime(e.target.value)}
          />
          {provider === null && (
            <WarningField
              severity="warning"
              title="Escolha um Fornecedor"
              message="Escolha um fornecedor de transporte para continuar o cadastro"
            />
          )}
          {provider === 'Prefeitura' && (
            <>
              <InfoTextField
                label="Motorista"
                defaultValue={driver}
                fullWidth={true}
                icon={<AccountBox />}
                onChange={e => setDriver(e.target.value)}
              />
              <InfoTextField
                label="Limite de Passageiros"
                defaultValue={passengersLimit?.toString()}
                fullWidth={true}
                icon={<Diversity1 />}
                onChange={e => setPassengersLimit(Number(e.target.value))}
              />
            </>
          )}
          {provider === 'Escon' && (
            <InfoTextField
              label="Linha"
              defaultValue={line?.toString()}
              fullWidth={true}
              icon={<Tag />}
              onChange={e => setLine(Number(e.target.value))}
            />
          )}
          {submit && (
            <WarningField
              severity="success"
              title="Cadastro realizado com sucesso!"
              message={`O cadastro do Transporte ${plate} fornecido pela ${provider} foi realizado com sucesso!`}
            />
          )}

          {!submit && areFieldsAcceptable() && (
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
              message={`O transporte já consta na base de dados! Verifique a integridade das entradas.`}
            />
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
