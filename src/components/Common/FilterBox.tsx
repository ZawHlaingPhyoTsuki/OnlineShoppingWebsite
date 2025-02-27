import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBoxProps {
  value: string; // Current selected value
  onValueChange: (value: string) => void; // Callback to handle value changes
  placeholder?: string; // Placeholder text
  options: { value: string; label: string }[]; // Array of options
  className?: string; // Optional custom class for styling
}

const FilterBox: React.FC<FilterBoxProps> = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  className = "",
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-[180px] bg-muted/50 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterBox;
