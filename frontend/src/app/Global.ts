import {User} from "./models/User";

export class Permissions {
  static sales: string = "Sales";
  static hr: string = "HR";
  static ceo: string = "Leader";

  static permissionSales : string[] = ['viewOwnBonusCalc', 'socialPerformanceEval', 'writeTarget', 'writeValueSocialPerformance'];
  static permissionHR : string[] = ['allBonusCalc', 'confirm'];
  static permissionCEO : string[] = ['allBonusCalc', 'socialPerformanceTarget', 'confirm', 'writeComments', 'writeTargetSocialPerformance'];

  static hasUserPermission(user : User, action : string){
    if(user.role == Permissions.sales){
      return this.permissionSales.includes(action);
    }
    else if(user.role == Permissions.hr){
      return this.permissionHR.includes(action);
    }
    else if(user.role == Permissions.ceo){
      return this.permissionCEO.includes(action);
    }
  }
}

export const years : string[] = ['2021', '2020', '2019', '2018', '2017'];

export const ratings : string[] = ['1', '2', '3', '4', '5'];
