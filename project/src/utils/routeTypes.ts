import { Route } from '../types/route';

export interface TravelPlan {
  routes: Route[];
  totalFlights: number;
  totalCost: number;
}