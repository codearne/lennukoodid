export interface CityInfo {
  name: string;
  country?: string;
  code?: string;
}

export interface CitySearchProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  availableCities: string[];
  onRemove?: () => void;
}

// Helper function to format city display
export function formatCityDisplay(city: CityInfo): string {
  const mainText = city.name;
  const extraInfo = [city.country, city.code].filter(Boolean).join(' • ');
  
  return extraInfo ? `${mainText} - ${extraInfo}` : mainText;
}