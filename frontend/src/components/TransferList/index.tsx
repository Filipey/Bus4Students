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
import { StudentService } from '../../services/StudentService'

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
  const [initialStudentBuses] = useState(studentBuses)
  const [originalStudentBuses] = useState(student.buses.map(bus => bus.plate))
  const [error, setError] = useState(false)

  const atualBuses = option === 'Prefeitura' ? hallBuses : esconBuses

  const leftChecked = intersection(checked, atualBuses)
  const rightChecked = intersection(checked, studentBuses)

  function fetchData() {
    BusService.getAllEsconBuses().then(res => {
      const allEsconPlates = res.data.map(bus => bus.plate)
      const availableBuses = allEsconPlates.filter(
        plate => !studentBuses.includes(plate)
      )
      setEsconBuses(availableBuses)
    })
    BusService.getAllHallBuses().then(res => {
      const allHallPlates = res.data.map(bus => bus.plate)
      const availableBuses = allHallPlates.filter(
        plate => !studentBuses.includes(plate)
      )
      setHallBuses(availableBuses)
    })
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

  const handleSubmitChanges = () => {
    const originalBuses = student.buses.map(bus => bus.plate)
    const removedBuses = originalBuses.map(bus =>
      originalBuses.includes(bus) && !studentBuses.includes(bus) ? bus : null
    )
    const addedBuses = studentBuses.map(bus =>
      !originalBuses.includes(bus) && studentBuses.includes(bus) ? bus : null
    )
    initialStudentBuses.map(plate => {
      if (addedBuses.includes(plate)) {
        StudentService.delegateBus(student.cpf, plate)
      } else if (removedBuses.includes(plate)) {
        StudentService.removeBusFromStudent(student.cpf, plate)
      }
    })
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
            onClick={handleCheckStudentBus}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckAllBuses}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selecionados', studentBuses)}</Grid>
      {JSON.stringify(originalStudentBuses) !==
        JSON.stringify(studentBuses) && (
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
