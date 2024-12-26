import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { X, GripVertical } from 'lucide-react';
import { CitySearch } from './CitySearch';

interface DestinationListProps {
  destinations: string[];
  onDestinationsChange: (destinations: string[]) => void;
  availableCities: string[];
}

export const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  onDestinationsChange,
  availableCities,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(destinations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onDestinationsChange(items);
  };

  const handleRemoveDestination = (index: number) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    onDestinationsChange(newDestinations);
  };

  const handleUpdateDestination = (index: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    onDestinationsChange(newDestinations);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="destinations">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {destinations.map((destination, index) => (
              <Draggable 
                key={`${index}-${destination}`} 
                draggableId={`destination-${index}`} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex gap-2 mb-4 items-center"
                  >
                    <div
                      {...provided.dragHandleProps}
                      className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CitySearch
                        value={destination}
                        onChange={(value) => handleUpdateDestination(index, value)}
                        label={`Sihtkoht ${index + 1}`}
                        availableCities={availableCities}
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveDestination(index)}
                      className="self-end p-2 mb-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};