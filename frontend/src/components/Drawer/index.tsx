import { ChevronLeft } from '@material-ui/icons'
import { Avatar, Divider, IconButton, styled, Toolbar } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { DrawerListItem } from '../ListItem'

const logo = '../../img/onibusExemplo.jpeg'

interface DrawerProps {
  open: boolean
  toggleDrawer(): void
  urls: string[]
}

interface DrawerSetupProps {
  open?: boolean
}

const DrawerSetup = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})<DrawerSetupProps>(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

export function Drawer({ open, toggleDrawer, urls }: DrawerProps) {
  return (
    <DrawerSetup variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <Avatar
          src={logo}
          sx={{
            mr: 18
          }}
        />
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <DrawerListItem urls={urls} />
    </DrawerSetup>
  )
}
