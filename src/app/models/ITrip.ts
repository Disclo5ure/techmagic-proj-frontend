export interface ITrip {
  route: { _id: string; name: string; distance: number; days: number; cost: number; __v: 0 };
  drivers: {
    _id: string;
    surname: string;
    name: string;
    patronymic: string;
    experience: number;
    __v: 0;
  }[];
  startDate: Date;
  endDate: Date;
  bounty: number;
}

export interface IAddedTrip {
  route: string;
  drivers: string[];
  startDate: string;
  endDate: string;
  bounty: number;
}
