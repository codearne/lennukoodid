import React, { useState, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { CitySearchProps } from '../types/city';
import { useClickOutside } from '../hooks/useClickOutside';
import { cityData } from '../data/cityInfo';

export const CitySearch: React.FC<CitySearchProps> = ({
  value = '',
  onChange,
  label,
  availableCities,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setIsOpen(false), []);
  useClickOutside(wrapperRef, handleClose);

  const filteredCities = availableCities
    .filter(city => {
      const searchLower = search.toLowerCase();
      const cityInfo = cityData[city] || { name: city };
      
      return (
        city.toLowerCase().includes(searchLower) || // Search by city name
        cityInfo.code?.toLowerCase() === searchLower || // Exact match for airport code
        cityInfo.country?.toLowerCase().includes(searchLower) // Search by country name
      );
    })
    .slice(0, 10);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    setIsOpen(true);
  };

  const handleCitySelect = (city: string) => {
    setSearch(city);
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Otsi linna, riiki või lennujaama koodi..."
        />
      </div>
      
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {filteredCities.map((city) => {
              const cityInfo = cityData[city] || { name: city };
              const extraInfo = [cityInfo.country, cityInfo.code].filter(Boolean).join(' • ');
              
              return (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <span className="font-bold">{cityInfo.name}</span>
                  {extraInfo && (
                    <span className="text-gray-500 text-sm">{extraInfo}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};