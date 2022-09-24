import { List, ListItemText } from '@material-ui/core'
import { Dashboard, DirectionsBus, School, Subtitles } from '@material-ui/icons'
import { Person2 } from '@mui/icons-material'
import BadgeIcon from '@mui/icons-material/Badge'
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
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={iconText} />
      </ListItemButton>
    </ListItem>
  )
}

interface DrawerListItemProps {
  urls: string[]
}

export function DrawerListItem({ urls }: DrawerListItemProps) {
  const [dashboard, bus, school, ticket, pass, person] = urls

  return (
    <List>
      <MyListItem icon={<Dashboard />} url={dashboard} iconText="Dashboard" />
      <MyListItem icon={<DirectionsBus />} url={bus} iconText="Onibus" />
      <MyListItem icon={<School />} url={school} iconText="Escolas" />
      <MyListItem icon={<Subtitles />} url={ticket} iconText="Tickets" />
      <MyListItem icon={<BadgeIcon />} url={pass} iconText="Carteira" />
      <MyListItem icon={<Person2 />} url={person} iconText="Estudante" />
    </List>
  )
}
