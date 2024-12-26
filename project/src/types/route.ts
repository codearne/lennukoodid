export type TripType = 
  | 'custom' 
  | 'random'
  | keyof typeof import('../utils/cityCategories').cityCategories;