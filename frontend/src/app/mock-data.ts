export interface Salesman {
  id: number;
  name: string;
  department: string;
  year_of_performance: number;
}

export const SALESMEN = [
  {
    id: 90123,
    name: 'John Smith',
    department: 'Sales',
    year_of_performance: '2018'
  },
  {
    id: 90124,
    name: 'Marcus Gal',
    department: 'Sales',
    year_of_performance: '2018'
  },
  {
    id: 90125,
    name: 'Avias Dean',
    department: 'Sales',
    year_of_performance: '2018'
  },
];


export const ORDERS_EVALUATION = [
  {
    id: 1,
    name: 'HooverGo',
    client: 'Telekom AG',
    client_ranking: 'excellent',
    items: 20,
    bonus: 300
  },
  {
    id: 2,
    name: 'Hoover Clean',
    client: 'Germania AG',
    client_ranking: 'good',
    items: 50,
    bonus: 600
  },
];

export const SOCIAL_PERFORMANCE_EVALUATION = [
  {
    id: 1,
    name: 'Leadership Competence',
    target_value: 4,
    actual_value: 4,
    bonus: 50
  },
  {
    id: 2,
    name: 'Integrity to Company',
    target_value: 4,
    actual_value: 3,
    bonus: 70
  },
  {
    id: 3,
    name: 'Openess to Employee',
    target_value: 4,
    actual_value: 3,
    bonus: 60
  }
];

export const SALESMAN = {
  sid: '90123',
  first_name: 'John',
  last_name: 'Smith',
  department: 'Sales'
}
