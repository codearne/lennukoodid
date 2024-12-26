import { TripType } from './route';

export interface TripControlsProps {
  tripType: TripType;
  onTripTypeChange: (type: TripType) => void;
  maxStops: number;
  onMaxStopsChange: (stops: number) => void;
  numDestinations: number;
  onNumDestinationsChange: (num: number) => void;
  isRoundTrip: boolean;
  onRoundTripChange: (isRoundTrip: boolean) => void;
}