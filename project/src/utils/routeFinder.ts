import { Route } from '../types/route';
import { TravelPlan } from './routeTypes';

const FLIGHT_PRICE = 10;
export const DEFAULT_MAX_STOPS = 500;

// Optimized route finding using Dijkstra's algorithm
function findShortestPath(
  routeGraph: Map<string, Route[]>,
  start: string,
  end: string,
  maxStops: number = DEFAULT_MAX_STOPS
): Route[] | null {
  const distances = new Map<string, number>();
  const previous = new Map<string, Route>();
  const visited = new Set<string>();
  
  // Initialize distances
  distances.set(start, 0);
  
  while (true) {
    // Find closest unvisited city
    let currentCity: string | null = null;
    let shortestDistance = Infinity;
    
    distances.forEach((dist, city) => {
      if (!visited.has(city) && dist < shortestDistance) {
        currentCity = city;
        shortestDistance = dist;
      }
    });
    
    if (currentCity === null || currentCity === end) break;
    
    visited.add(currentCity);
    
    // Check neighbors
    const neighbors = routeGraph.get(currentCity) || [];
    for (const route of neighbors) {
      if (visited.has(route.to)) continue;
      
      const newDist = distances.get(currentCity)! + 1;
      if (newDist > maxStops) continue;
      
      const currentDist = distances.get(route.to) ?? Infinity;
      if (newDist < currentDist) {
        distances.set(route.to, newDist);
        previous.set(route.to, route);
      }
    }
  }
  
  // Reconstruct path
  if (!previous.has(end)) return null;
  
  const path: Route[] = [];
  let current = end;
  while (current !== start) {
    const route = previous.get(current)!;
    path.unshift(route);
    current = route.from;
  }
  
  return path;
}

// Build an adjacency list for faster lookups
function buildRouteGraph(routes: Route[]): Map<string, Route[]> {
  const graph = new Map<string, Route[]>();
  for (const route of routes) {
    if (!graph.has(route.from)) {
      graph.set(route.from, []);
    }
    graph.get(route.from)!.push(route);
  }
  return graph;
}

export function findRoute(
  routes: Route[],
  start: string,
  destinations: string[] = [],
  maxStops: number = DEFAULT_MAX_STOPS
): TravelPlan | null {
  if (!destinations.length) return null;
  
  const routeGraph = buildRouteGraph(routes);
  const plan: TravelPlan = {
    routes: [],
    totalFlights: 0,
    totalCost: 0
  };

  let currentCity = start;

  for (const destination of destinations) {
    const path = findShortestPath(routeGraph, currentCity, destination, maxStops);
    
    if (!path) {
      console.log(`No route found from ${currentCity} to ${destination}`);
      return null;
    }

    plan.routes.push(...path);
    currentCity = destination;
  }

  plan.totalFlights = plan.routes.length;
  plan.totalCost = plan.totalFlights * FLIGHT_PRICE;

  return plan;
}