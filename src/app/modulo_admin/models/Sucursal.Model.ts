import {SucursalInterface} from "../interfaces/Sucursal.Interface";

export class SucursalModel implements SucursalInterface{
  _id: string | null = "";
  address: string = "";
  email: string = "";
  name: string = "";
  phone: string = "";
}
