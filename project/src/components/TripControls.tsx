import React from 'react';
import { TripControlsProps } from '../types/tripControls';
import { categoryDisplayNames } from '../utils/cityCategories';

export const TripControls: React.FC<TripControlsProps> = ({
  tripType,
  onTripTypeChange,
  maxStops,
  onMaxStopsChange,
  numDestinations,
  onNumDestinationsChange,
  isRoundTrip,
  onRoundTripChange,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Reisi tüüp
      </label>
      <select
        value={tripType}
        onChange={(e) => onTripTypeChange(e.target.value as TripType)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="custom">Loo täitsa ise</option>
        <option value="random">Mul on jumala suva</option>
        {Object.entries(categoryDisplayNames).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Maksimaalne vahepeatuste arv
      </label>
      <input
        type="number"
        min="1"
        max="30"
        value={maxStops}
        onChange={(e) => onMaxStopsChange(parseInt(e.target.value))}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>

    {tripType !== 'custom' && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sihtkohtade arv
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={numDestinations}
          onChange={(e) => onNumDestinationsChange(parseInt(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    )}

    <div className="flex items-center">
      <input
        type="checkbox"
        id="roundTrip"
        checked={isRoundTrip}
        onChange={(e) => onRoundTripChange(e.target.checked)}
        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      <label htmlFor="roundTrip" className="ml-2 block text-sm text-gray-700">
        Edasi-tagasi reis
      </label>
    </div>
  </div>
);