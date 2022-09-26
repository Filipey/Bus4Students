import { EsconBus, HallBus } from '../schemas'

export function isHallBus(object: any): object is HallBus {
  return 'driver' in object
}

export function isEsconBus(object: any): object is EsconBus {
  return 'line' in object
}
