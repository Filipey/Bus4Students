import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ListItemButton } from '@mui/material';

interface IProps {
    open: boolean,
    setOpenMenu(state: boolean): void
}

const IconsDrawer = [

    <IconButton aria-label="inicio" href='/'>
        <HomeIcon />
    </IconButton>,

    <IconButton aria-label="onibus" >
        <AirportShuttleIcon />
    </IconButton>,

    <IconButton aria-label="carteirinha">
        <CreditCardIcon />
    </IconButton>,

    <IconButton aria-label="vale-transporte">
        <ConfirmationNumberIcon />
    </IconButton>

]

export default function DrawerAdmin({ open, setOpenMenu }: IProps) {


    return (
        <Drawer
            open={open}
            onClose={() => setOpenMenu(!open)}
            anchor='left'
        >
            <Box p={2} width='200px' textAlign='center' role='presentation'>

                <Divider />
                <IconButton aria-label="inicio" href='/'>
                    <HomeIcon />
                </IconButton>
                <Divider />

                <List>
                    {['Pagina Inicial', 'Ônibus', 'Carteirinha', 'Vale Transporte'].map((text, index) => (
                        <ListItem key={text} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {IconsDrawer[index]}
                                </ListItemIcon>
                                {/* <ListItemText primary={text} /> */}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Box>
        </Drawer>
    )
}