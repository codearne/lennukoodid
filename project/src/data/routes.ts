import { Route } from '../types/route';
import { routeConnections } from './routeConnections';

// Helper function to create a route with random duration and price
const createRoute = (from: string, to: string): Route => ({
  from,
  to,
  duration: Math.floor(Math.random() * 6) + 2, // 2-8 hours
  price: Math.floor(Math.random() * 500) + 100, // $100-600
});

// Convert connections into Route objects
export const routes: Route[] = routeConnections
  .split('\n')
  .filter(Boolean)
  .flatMap(connection => {
    const [from, to] = connection.split(' - ').map(city => city?.trim()).filter(Boolean);
    
    if (!from || !to) return [];
    
    // Create bidirectional routes
    return [
      createRoute(from, to),
      createRoute(to, from),
    ];
  });