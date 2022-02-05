import {AgendaInterface} from "../interfaces/Agenda.Interface";

export class AgendaModel implements AgendaInterface{
  _id: string | null = "";
  fullName: string = "";
  phone: string = "";
  email: string = "";
  nombreMascota: string= "";
  especie: string= "";
  fechaCita: string= "";
  horaCita: string= "";
}
