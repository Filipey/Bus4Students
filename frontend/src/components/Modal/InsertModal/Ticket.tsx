import { Close, LocationCity } from '@material-ui/icons'
import { CalendarMonth, Numbers, PriceChange } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { useEffect, useState } from 'react'
import { TicketService } from '../../../services/TicketService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface InsertTicketModalProps {
  state: boolean
  setState(state: boolean): void
}

export function InsertTicketModal({ state, setState }: InsertTicketModalProps) {
  const [source, setSource] = useState('')
  const [sink, setSink] = useState('')
  const [expirationDate, setExpirationDate] = useState<string | Date>(
    new Date()
  )
  const [value, setValue] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [submit, setSubmit] = useState(false)

  const isAvailableToSubmit = () => source !== '' && sink !== '' && value !== 0

  const handleSubmit = () => {
    const formattedDate = new Date(expirationDate)
    for (let index = 0; index < quantity; index++) {
      TicketService.createTicket({
        source,
        sink,
        expirationDate: formattedDate,
        value
      })
    }
    setSubmit(true)
  }

  const handleCancel = () => {
    setSource('')
    setSink('')
    setExpirationDate(new Date())
    setValue(0)
    setQuantity(1)
    setSubmit(false)
    setState(false)
  }

  useEffect(() => {
    isAvailableToSubmit()
  }, [source, sink, value])

  return (
    <Dialog open={state} scroll="body" fullWidth>
      <DialogTitle color="#03a9f4">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>Novo Vale Transporte</Grid>
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
            label="Origem"
            defaultValue={source}
            fullWidth={true}
            icon={<LocationCity />}
            onChange={e => setSource(e.target.value)}
          />
          <InfoTextField
            label="Destino"
            defaultValue={sink}
            fullWidth={true}
            icon={<LocationCity />}
            onChange={e => setSink(e.target.value)}
          />
          <InfoTextField
            label="Data de Validade"
            defaultValue={expirationDate}
            fullWidth
            type="date"
            icon={<CalendarMonth />}
            onChange={e => setExpirationDate(e.target.value as unknown as Date)}
          />
          <InfoTextField
            label="Valor"
            defaultValue={value.toString()}
            fullWidth
            icon={<PriceChange />}
            onChange={e => setValue(Number(e.target.value))}
          />
          <InfoTextField
            label="Quantidade"
            defaultValue={quantity.toString()}
            type="number"
            fullWidth
            icon={<Numbers />}
            onChange={e => setQuantity(Number(e.target.value))}
          />
          {submit && (
            <WarningField
              title="Cadastro realizado com sucesso!"
              severity="success"
              message={`Foram gerados ${quantity} vales de ${source} para ${sink} com valor de ${value}`}
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
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
