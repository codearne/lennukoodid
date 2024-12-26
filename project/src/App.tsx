import React, { useState, useCallback, useRef } from 'react';
import { Plus } from 'lucide-react';
import { routes } from './data/routes';
import { findRoute } from './utils/routePlanner';
import { generateRandomTrip } from './utils/routePlanner';
import { TravelPlanDisplay } from './components/TravelPlanDisplay';
import { CitySearch } from './components/CitySearch';
import { DestinationList } from './components/DestinationList';
import { TripControls } from './components/TripControls';
import { CustomTripInstructions } from './components/CustomTripInstructions';
import { TripType } from './types/route';
import { cityData } from './data/cityInfo';
import { DEFAULT_MAX_STOPS } from './utils/routeFinder';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [destinations, setDestinations] = useState<string[]>([]);
  const [plan, setPlan] = useState<ReturnType<typeof findRoute>>(null);
  const [error, setError] = useState('');
  const [tripType, setTripType] = useState<TripType>('custom');
  const [numDestinations, setNumDestinations] = useState(2);
  const [maxStops, setMaxStops] = useState(DEFAULT_MAX_STOPS);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  
  // Keep track of whether destinations were manually modified
  const destinationsModified = useRef(false);

  const availableCities = Array.from(
    new Set(routes.flatMap(route => [route.from, route.to]))
  ).sort();

  const handleAddDestination = () => {
    setDestinations([...destinations, '']);
    destinationsModified.current = true;
  };

  const handleDestinationsChange = (newDestinations: string[]) => {
    setDestinations(newDestinations);
    destinationsModified.current = true;
  };

  const generatePlan = useCallback(() => {
    if (!startLocation) {
      setError('Palun vali alguspunkt');
      return;
    }

    let currentDestinations = destinations;
    
    // For non-custom trips, generate new random destinations only if not modified
    if (tripType !== 'custom' && !destinationsModified.current) {
      currentDestinations = generateRandomTrip(
        startLocation,
        tripType,
        routes,
        numDestinations
      );
      setDestinations(currentDestinations);
    }

    const filteredDestinations = currentDestinations.filter(d => d !== '');
    const finalDestinations = isRoundTrip 
      ? [...filteredDestinations, startLocation]
      : filteredDestinations;

    const generatedPlan = findRoute(routes, startLocation, finalDestinations, maxStops);

    if (!generatedPlan) {
      setError('Ei leidnud sobivat marsruuti. Proovi teisi sihtkohti!');
      return;
    }

    setError('');
    setPlan(generatedPlan);
  }, [startLocation, destinations, tripType, numDestinations, isRoundTrip, maxStops]);

  const handleTripTypeChange = (newType: TripType) => {
    setTripType(newType);
    destinationsModified.current = false;
    if (newType !== 'custom') {
      const generatedDestinations = generateRandomTrip(
        startLocation,
        newType,
        routes,
        numDestinations
      );
      setDestinations(generatedDestinations);
      setPlan(null);
      setError('');
    } else {
      setDestinations([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lennuplaani-leiutaja</h1>
          <p className="text-gray-600">Kavanda mõned kohutavalt kreisid reisid</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CitySearch
                  value={startLocation}
                  onChange={setStartLocation}
                  label="Alguspunkt"
                  availableCities={availableCities}
                />
              </div>
              <TripControls
                tripType={tripType}
                onTripTypeChange={handleTripTypeChange}
                maxStops={maxStops}
                onMaxStopsChange={setMaxStops}
                numDestinations={numDestinations}
                onNumDestinationsChange={setNumDestinations}
                isRoundTrip={isRoundTrip}
                onRoundTripChange={setIsRoundTrip}
              />
            </div>

            {tripType === 'custom' && <CustomTripInstructions />}

            <DestinationList
              destinations={destinations}
              onDestinationsChange={handleDestinationsChange}
              availableCities={availableCities}
            />

            {tripType === 'custom' && (
              <button
                onClick={handleAddDestination}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-5 w-5 mr-1" />
                Lisa sihtkoht
              </button>
            )}

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
              onClick={generatePlan}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Leiuta lennuplaan!
            </button>
          </div>
        </div>

        {plan && (
          <TravelPlanDisplay 
            {...plan} 
            userDestinations={destinations}
          />
        )}
      </div>
    </div>
  );
}

export default App;