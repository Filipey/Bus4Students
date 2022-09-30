import { Api } from '../providers'
import { EsconBus, EsconBusDTO, HallBus, HallBusDTO } from '../schemas'

const getAllHallBuses = () => Api.get<HallBus[]>('/hall')

const insertNewHallBus = (hallBus: HallBus) => Api.post('/hall', hallBus)

const getHallBusByPlate = (plate: string) => Api.get(`/hall/${plate}`)

const updateHallBus = (plate: string, hallBus: HallBusDTO) =>
  Api.put(`/hall/${plate}`, hallBus)

const deleteHallBus = (plate: string) => Api.delete(`/hall/${plate}`)

const getAllEsconBuses = () => Api.get<EsconBus[]>('/escon')

const createEsconBus = (bus: EsconBus) => Api.post('/escon', bus)

const getEsconBusInfo = (plate: string) => Api.get(`/escon/${plate}`)

const deleteEsconBus = (plate: string) => Api.delete(`/escon/${plate}`)

const updateEsconBus = (plate: string, esconBus: EsconBusDTO) =>
  Api.put(`/escon/${plate}`, esconBus)

export const BusService = {
  getAllHallBuses,
  insertNewHallBus,
  getHallBusByPlate,
  updateHallBus,
  deleteHallBus,
  getAllEsconBuses,
  createEsconBus,
  getEsconBusInfo,
  deleteEsconBus,
  updateEsconBus
}
