import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface IProps {
    open: boolean,
    setOpenMenu(state: boolean): void
}

export default function DrawerUser({ open, setOpenMenu }: IProps) {


    return (
        <Drawer
            open={open}
            onClose={() => setOpenMenu(!open)}
            anchor='left'
        >
            <Box p={2} width='200px' textAlign='center' role='presentation'>

            </Box>
        </Drawer>
    )
}