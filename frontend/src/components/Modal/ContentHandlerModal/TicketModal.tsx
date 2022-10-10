import { Close, LocationCity } from '@material-ui/icons'
import { CalendarMonth, PriceChange } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Ticket } from '../../../schemas'
import { TicketService } from '../../../services/TicketService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface TicketModalProps {
  ticket: Ticket
  state: boolean[]
  setState(state: boolean[]): void
  index: number
  mode: 'edit' | 'delete'
}

export function TicketModal({
  ticket,
  state,
  setState,
  index,
  mode
}: TicketModalProps) {
  const [source, setSource] = useState(ticket.source)
  const [sink, setSink] = useState(ticket.sink)
  const [expirationDate, setExpirationDate] = useState<string | Date>(
    ticket.expirationDate
  )
  const [value, setValue] = useState(ticket.value)
  const [changes, setChanges] = useState([])
  const [submit, setSubmit] = useState(false)
  const [successWarning, setSuccessWarning] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const disableFields = mode !== 'edit'

  const handleCloseModal = () => {
    setSource(ticket.source)
    setSink(ticket.sink)
    setExpirationDate(ticket.expirationDate)
    setValue(ticket.value)
    setChanges([])
    setSubmit(false)
    setSuccessWarning(false)
    setConfirmDelete(false)
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  function hasChanged() {
    if (source !== ticket.source) {
      changes.find(c => c === 'Origem')
        ? null
        : setChanges([...changes, 'Origem'])
    }
    if (sink !== ticket.sink) {
      changes.find(c => c === 'Destino')
        ? null
        : setChanges([...changes, 'Destino'])
    }
    if (expirationDate !== ticket.expirationDate) {
      changes.find(c => c === 'Data de Validade')
        ? null
        : setChanges([...changes, 'Data de Validade'])
    }
    if (value !== ticket.value) {
      changes.find(c => c === 'Valor')
        ? null
        : setChanges([...changes, 'Valor'])
    }
  }

  function handleSubmitChanges() {
    const submitDate = new Date(expirationDate)

    TicketService.updateTicketInfo(ticket.id, {
      source,
      sink,
      expirationDate: submitDate,
      value
    }).then(res => (res.status === 204 ? setSuccessWarning(true) : null))
    setChanges([])
    setSubmit(false)
  }

  function handleConfirmDelete() {
    TicketService.deleteTicket(ticket.id).then(res =>
      res.status === 204 ? setSuccessWarning(true) : null
    )
    setConfirmDelete(false)
  }

  useEffect(() => {
    hasChanged()
  }, [source, sink, expirationDate, value])

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Vale Transporte - {ticket.id}</Grid>
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
              icon={<LocationCity />}
              label="Origem"
              fullWidth
              disabled={disableFields}
              defaultValue={ticket.source}
              onChange={e => setSource(e.target.value)}
            />
            <InfoTextField
              icon={<LocationCity />}
              label="Destino"
              fullWidth
              disabled={disableFields}
              defaultValue={ticket.sink}
              onChange={e => setSink(e.target.value)}
            />

            <InfoTextField
              fullWidth
              icon={<CalendarMonth />}
              type="date"
              label="Data de Expiração"
              disabled={disableFields}
              onChange={e =>
                setExpirationDate(e.target.value as unknown as Date)
              }
              defaultValue={expirationDate}
            />
            <InfoTextField
              fullWidth
              icon={<PriceChange />}
              label="Valor"
              defaultValue={ticket.value.toString()}
              disabled={disableFields}
              onChange={e => setValue(Number(e.target.value))}
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
                  message={`O Vale ${ticket.id} de Origem: ${source} e Destino: ${sink} será deletado.`}
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
