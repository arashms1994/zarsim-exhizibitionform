import { useState, useMemo } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import type { ICitiesApiItem } from "@/types/type";

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  cities: ICitiesApiItem[];
  className?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  onBlur,
  placeholder = "شهر را انتخاب کنید",
  cities,
  className,
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) {
      return cities;
    }
    return cities.filter((city) =>
      city.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const handleSelect = (cityTitle: string) => {
    onChange(cityTitle);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      onBlur?.();
    }, 200);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={className}
      />
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#1e7677] rounded-md shadow-lg max-h-60 overflow-auto rtl:text-right">
          {filteredCities.map((city) => (
            <div
              key={city.Title}
              onClick={() => handleSelect(city.Title)}
              className={cn(
                "px-4 py-2 cursor-pointer border-[#1e7677] hover:bg-[#1e7677] hover:text-white transition-colors",
                value === city.Title && "bg-[#1e7677] text-white"
              )}
            >
              {city.Title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
