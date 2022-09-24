import { List, ListItemText } from '@material-ui/core'
import {
  AirportShuttle,
  ConfirmationNumber,
  CreditCard,
  Dashboard
} from '@material-ui/icons'
import { Person2 } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface MyListItemProps {
  icon: JSX.Element
  url: string
  iconText: string
}

function MyListItem({ icon, url, iconText }: MyListItemProps) {
  const navigate = useNavigate()
  const handleNavigate = () => navigate(url)

  return (
    <ListItem onClick={handleNavigate}>
      <ListItemIcon>
        <ListItemButton>
          {icon}
          <ListItemText primary={iconText} />
        </ListItemButton>
      </ListItemIcon>
    </ListItem>
  )
}

interface DrawerListItemProps {
  urls: string[]
}

export function DrawerListItem({ urls }: DrawerListItemProps) {
  const [dashboard, bus, school, ticket, person] = urls

  return (
    <List>
      <MyListItem icon={<Dashboard />} url={dashboard} iconText="Dashboard" />
      <MyListItem icon={<AirportShuttle />} url={bus} iconText="Onibus" />
      <MyListItem icon={<CreditCard />} url={school} iconText="Escolas" />
      <MyListItem
        icon={<ConfirmationNumber />}
        url={ticket}
        iconText="Tickets"
      />
      <MyListItem icon={<Person2 />} url={person} iconText="Estudante" />
    </List>
  )
}
