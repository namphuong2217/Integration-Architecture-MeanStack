import {User} from "./models/User";

export class Role {
  static sales: string = "Sales";
  static hr: string = "HR";
  static ceo: string = "Leader"

  static hasRoleHR(user : User): boolean {
    return user.role == Role.hr;
  }

  static hasRoleCEO(user : User): boolean {
    return user.role == Role.ceo;
  }

  static hasRoleSales(user : User): boolean {
    return user.role == Role.sales;
  }
}

export const years : string[] = ['2021', '2020', '2019', '2018', '2017'];
