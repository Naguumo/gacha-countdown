import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export function FilterGroup({ title, options, selectedValues, onChange, className }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <Card className={className}>
      <CardHeader className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex items-center justify-between'>
          <CardTitle>{title}</CardTitle>
          {isOpen ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <fieldset>
            <legend className='sr-only'>{title}</legend>
            <div className='space-y-2'>
              {options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`filter-${option.value}`}
                  className='flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors'>
                  <Checkbox
                    id={`filter-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                    className='mr-3'
                  />
                  <span className='flex-1'>{option.label}</span>
                  {option.count !== undefined && <span className='text-muted-foreground text-sm'>({option.count})</span>}
                </label>
              ))}
            </div>
          </fieldset>
        </CardContent>
      )}
    </Card>
  );
}
