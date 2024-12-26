import React from 'react';
import { Plane } from 'lucide-react';
import { Route } from '../types/route';

interface TravelPlanDisplayProps {
  routes: Route[];
  totalFlights: number;
  totalCost: number;
  userDestinations?: string[]; // Add prop for user-selected destinations
}

export const TravelPlanDisplay: React.FC<TravelPlanDisplayProps> = ({
  routes,
  totalFlights,
  totalCost,
  userDestinations = [], // Default to empty array if not provided
}) => {
  // Create a Set of user-selected destinations for O(1) lookups
  const destinationSet = new Set(userDestinations);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Sinu lennuplaan</h2>
      <div className="space-y-4">
        {routes.map((route, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium">{route.from}</span>
                <Plane className="w-5 h-5 text-blue-500 mx-4 transform -rotate-45" />
                <span className={`font-medium ${destinationSet.has(route.to) ? 'text-blue-600' : ''}`}>
                  {route.to}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-lg">
          <span className="font-medium">Lendude arv:</span>
          <span>{totalFlights}</span>
        </div>
        <div className="flex justify-between text-lg mt-2">
          <span className="font-medium">Kogumaksumus:</span>
          <span>€{totalCost}</span>
        </div>
      </div>
    </div>
  );
};