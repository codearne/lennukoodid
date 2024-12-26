import { Route, TripType } from '../types/route';
import { cityCategories } from './cityCategories';

export function generateRandomTrip(
  start: string, 
  tripType: TripType, 
  routes: Route[],
  numDestinations: number
): string[] {
  if (tripType === 'custom') return [];
  
  // Get all available cities from routes
  const availableCities = new Set(routes.flatMap(route => [route.from, route.to]));
  
  if (tripType === 'random') {
    return Array.from(availableCities)
      .filter(city => city !== start && availableCities.has(city))
      .sort(() => Math.random() - 0.5)
      .slice(0, numDestinations);
  }
  
  const categoryCities = cityCategories[tripType as keyof typeof cityCategories];
  const validCities = categoryCities.filter(city => 
    city !== start && availableCities.has(city)
  );

  // If no valid cities found in category, fall back to random selection
  if (validCities.length === 0) {
    return Array.from(availableCities)
      .filter(city => city !== start)
      .sort(() => Math.random() - 0.5)
      .slice(0, numDestinations);
  }

  return validCities
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(numDestinations, validCities.length));
}