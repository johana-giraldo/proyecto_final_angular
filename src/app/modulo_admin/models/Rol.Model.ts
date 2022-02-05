import {RolInterface} from "../interfaces/Rol.Interface";

export class RolModel implements RolInterface{
  _id: string | null = "";
  name: string = "";
  description: string = "";
  permissions: string[] = [];
}
