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
import { Student } from '../../schemas'
import { BusService } from '../../services/BusService'

interface BusTransferListProps {
  option: string
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

export function BusTransferList({ option, student }: BusTransferListProps) {
  const [esconBuses, setEsconBuses] = useState<string[]>([])
  const [hallBuses, setHallBuses] = useState<string[]>([])
  const [checked, setChecked] = useState([])
  const [studentBuses, setStudentBuses] = useState(
    student.buses.map(bus => bus.plate)
  )
  const [originalStudentBuses] = useState(student.buses.map(bus => bus.plate))

  const atualBuses = option === 'Prefeitura' ? hallBuses : esconBuses

  const leftChecked = intersection(checked, atualBuses)
  const rightChecked = intersection(checked, studentBuses)

  function fetchData() {
    BusService.getAllEsconBuses().then(res =>
      setEsconBuses(res.data.map(bus => bus.plate))
    )
    BusService.getAllHallBuses().then(res =>
      setHallBuses(res.data.map(bus => bus.plate))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const handleCheckStudentBus = () => {
    setStudentBuses(studentBuses.concat(leftChecked))
    option === 'Prefeitura'
      ? setHallBuses(not(hallBuses, leftChecked))
      : setEsconBuses(not(esconBuses, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckAllBuses = () => {
    option === 'Prefeitura'
      ? setHallBuses(hallBuses.concat(rightChecked))
      : setEsconBuses(esconBuses.concat(rightChecked))
    setStudentBuses(not(studentBuses, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const customList = (title: ReactNode, items: string[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
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
          width: 200,
          height: 230,
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
      <Grid item>{customList('Opções', atualBuses)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleCheckStudentBus()}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleCheckAllBuses()}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selecionados', studentBuses)}</Grid>
    </Grid>
  )
}
