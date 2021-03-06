import { User } from './models/User';

export class Permissions {
  static sales: string = 'Sales';
  static hr: string = 'HR';
  static ceo: string = 'Leader';
  static admin: string = 'admin';

  static permissionSales: string[] = [
    'viewOwnBonusCalc',
    'socialPerformanceEval',
    'writeTarget',
    'writeValueSocialPerformance',
  ];
  static permissionHR: string[] = [
    'allBonusCalc',
    'confirm',
    'alterSocialPerformance',
  ];
  static permissionCEO: string[] = [
    'allBonusCalc',
    'socialPerformanceTarget',
    'confirm',
    'writeComments',
    'writeTargetSocialPerformance',
  ];
  static permissionAdmin: string[] = [
    'registerAccount',
  ];

  static hasUserPermission(user: User, action: string) {
    if (!user) return false;
    if (user.role === Permissions.sales) {
      return this.permissionSales.includes(action);
    } else if (user.role === Permissions.hr) {
      return this.permissionHR.includes(action);
    } else if (user.role === Permissions.ceo) {
      return this.permissionCEO.includes(action);
    } else if(user.role === Permissions.admin){
      return this.permissionAdmin.includes(action);
    }
  }
}

const makeLastYears = (yearsBack: number) => {
  const currentYear = new Date().getFullYear();
  const yearArray: string[] = [currentYear.toString()];
  for (let i = 1; i <= yearsBack; i++) {
    const tmpYear = currentYear - i;
    yearArray.push(tmpYear.toString());
  }
  return yearArray;
};

export const years: string[] = makeLastYears(5);

export const ratings: string[] = ['1', '2', '3', '4', '5'];
