import React, { memo } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  filters: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  onReset?: () => void;
}

// Utilisation de memo pour éviter les re-renders inutiles
const FilterSection: React.FC<FilterSectionProps> = memo(({ filters, onReset }) => {
  return (
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg border dark:border-gray-800 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
        <Filter size={16} className="text-dashboard-purple dark:text-violet-400 mr-2" />
        <h3 className="font-medium text-sm dark:text-gray-200">Filtres</h3>
        </div>
        {onReset && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="text-xs flex items-center gap-1"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <div key={filter.name} className="filter-item">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              {filter.name}
            </label>
            <Select 
              value={filter.value} 
              onValueChange={filter.onChange}
              disabled={filter.options.length <= 1}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Sélectionner ${filter.name.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.length > 0 ? (
                  filter.options.map((option) => (
                    <SelectItem key={`${filter.name}-${option.value}`} value={option.value}>
                    {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="all" disabled>
                    Aucune option disponible
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

export default FilterSection;
