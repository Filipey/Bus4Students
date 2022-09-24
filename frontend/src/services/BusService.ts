import { Api } from '../providers'
import { Bus, HallBus, HallBusDTO } from '../schemas'

const getAllHallBuses = () => Api.get('./hall')

const insertNewHallBus = (hallBus: HallBus) => Api.post('./hall', hallBus)

const getHallBusByPlate = (plate: string) => Api.get('./hall/' + { plate })

const updateHallBus = (plate: string, hallBus: HallBusDTO) =>
  Api.put('./hall/' + { plate }, hallBus)

const deleteHallBus = (plate: string) => Api.delete('./hall/' + { plate })

const getAllEsconBuses = () => Api.get('./escon')

const createEsconBus = (bus: Bus) => Api.post('./escon', bus)

const getEsconBusInfo = (plate: string) => Api.get('./escon/' + { plate })

const deleteEsconBus = (plate: string) => Api.delete('./escon/' + { plate })

const updateEsconBusLine = (line: string, plate: string) =>
  Api.patch('/escon/' + { plate }, line)

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
  updateEsconBusLine
}
