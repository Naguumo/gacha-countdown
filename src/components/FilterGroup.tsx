import { clsx } from 'clsx';

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
  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className={clsx('bg-white rounded-lg shadow p-4', className)}>
      <h3 className='font-semibold text-gray-900 mb-3'>{title}</h3>
      <div className='space-y-2'>
        {options.map((option) => (
          <label key={option.value} className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded'>
            <input
              type='checkbox'
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className='mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
            <span className='flex-1 text-gray-700'>{option.label}</span>
            {option.count !== undefined && <span className='text-gray-400 text-sm'>({option.count})</span>}
          </label>
        ))}
      </div>
    </div>
  );
}
