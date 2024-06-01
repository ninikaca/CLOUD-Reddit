export interface UserData {
  Id: string;
  Name: string;
  Surname: string;
  Address: string;
  City: string;
  Country: string;
  Phone: string;
  Email: string;
  Password: string;
  ImageUrl: string;
  Image?: string;
}

export const defaultUser: UserData = {
  Id: "",
  Name: "",
  Surname: "",
  Address: "",
  City: "",
  Country: "",
  Phone: "",
  Email: "",
  Password: "",
  ImageUrl: "",
  Image: ""
};
