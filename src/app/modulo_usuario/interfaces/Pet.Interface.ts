import { UserInterface } from "../../interfaces/User.Interface";

export interface PetInterface {
  _id: string;
  name: string;
  breed: string; // raza
  specie: string; // si es perro, gato, conejo, etc...
  birthday: Date;
  weight: number;
  owner: UserInterface;
}
