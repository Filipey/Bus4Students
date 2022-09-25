import { Container, Grid } from '@mui/material'
import { BusCard } from './BusCard'
import { InfoCard } from './InfoCard'
import { SchoolCard } from './SchoolCard'
import { StudentCard } from './StudentCard'
import { TicketCard } from './TicketCard'

export function Cards() {
  return (
    <>
      <Container maxWidth={false} style={{ paddingRight: '0px' }}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={6} xs={6}>
            <InfoCard
              title="Transporte escolar"
              info="Ações para Transportes Escolares"
              mediaLink="https://mobilidadefloripa.com.br/wp-content/uploads/2019/06/Ônibus-em-Florianópolis.jpg"
              collapseContent={<BusCard />}
            />
          </Grid>
          <Grid item lg={4} sm={6} xl={6} xs={6}>
            <InfoCard
              title="Instituição de Ensino"
              info="Ações para Instituições de Ensino"
              mediaLink="https://icea.ufop.br/sites/default/files/styles/os_files_xxlarge/public/icea/files/predios_e_cantina.jpg?m=1617829490&itok=LD3adigM"
              collapseContent={<SchoolCard />}
            />
          </Grid>
          <Grid item lg={4} sm={6} xl={6} xs={6}>
            <InfoCard
              title="Estudante"
              info="Ações para Estudantes"
              mediaLink="https://www.infoescola.com/wp-content/uploads/2020/07/estudantes-sucesso-658847998.jpg"
              collapseContent={<StudentCard />}
            />
          </Grid>
          <Grid item lg={4} sm={6} xl={6} xs={6}>
            <InfoCard
              title="Vale Transporte"
              info="Ações para Vales Transporte"
              mediaLink="https://audaztec.com.br/blog/wp-content/uploads/2020/04/original-60b6f2a3074847d3fcb6d0c4572aa7b2-850x550.jpeg"
              collapseContent={<TicketCard />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
