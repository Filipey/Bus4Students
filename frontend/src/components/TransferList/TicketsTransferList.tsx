import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { User } from '../../hooks/userContext'
import { Student, Ticket } from '../../schemas'
import { TicketService } from '../../services/TicketService'

interface TicketsTransferListProps {
  student: Student
}

function not(x: string[], y: string[]) {
  return x.filter(value => y.indexOf(value) === -1)
}

function union(x: string[], y: string[]) {
  return [...x, ...not(y, x)]
}

function intersection(x: string[], y: string[]) {
  return x.filter(value => y.indexOf(value) !== -1)
}

export function TicketsTransferList({ student }: TicketsTransferListProps) {
  const user: User = JSON.parse(window.sessionStorage.getItem('USER'))
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [allTickets, setAllTickets] = useState<string[]>([])
  const [checked, setChecked] = useState([])
  const [studentTickets, setStudentTickets] = useState([])
  const [error, setError] = useState(false)

  const leftChecked = intersection(checked, allTickets)
  const rightChecked = intersection(checked, studentTickets)

  function fetchData() {
    TicketService.getAllDisponibleTicket().then(res => setTickets(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const formattedTickets = tickets.map(
      ticket => `${ticket.id}/${ticket.source}/${ticket.sink}`
    )
    setAllTickets(formattedTickets)
  }, [tickets])

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1)
    setChecked(newChecked)
  }

  const numberOfChecked = (items: string[]) =>
    intersection(checked, items).length

  const handleToggleAll = (items: string[]) => {
    numberOfChecked(items) === items.length
      ? setChecked(not(checked, items))
      : setChecked(union(checked, items))
  }

  const handleCheckStudentCampus = () => {
    setStudentTickets(studentTickets.concat(leftChecked))
    setAllTickets(not(allTickets, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckallTicketses = () => {
    setAllTickets(allTickets.concat(rightChecked))
    setStudentTickets(not(studentTickets, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleSubmitChanges = () => {
    studentTickets.map(ticket => {
      const [id, origin, source] = ticket.split('/')
      TicketService.delegateTicket(id, student.cpf, user.cpf)
    })
  }

  const customList = (title: ReactNode, items: string[]) => (
    <Card>
      <CardHeader
        sx={{}}
        avatar={
          <Checkbox
            onClick={() => handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
      />
      <Divider />
      <List
        sx={{
          width: 220,
          height: 250,
          bgcolor: 'background.paper',
          overflow: 'auto'
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: string) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={() => handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid
      style={{ width: '100%' }}
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>{customList('Opções', allTickets)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckStudentCampus}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckallTicketses}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selecionados', studentTickets)}</Grid>
      {studentTickets.length > 0 && (
        <Grid
          container
          sx={{ pt: 2 }}
          spacing={10}
          alignContent="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Button variant="contained" color="error">
              Cancelar
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmitChanges}
              variant="contained"
              color="success"
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
