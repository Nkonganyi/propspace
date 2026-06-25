import { LocationPinIcon, HomeIcon, DollarIcon, SearchIcon } from "./icons";

type FilterBarProps = {
  city: string;
  onCityChange: (value: string) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  propertyTypes: string[];
  onSubmit: (e: React.FormEvent) => void;
};

// A single segmented bar — Location | Property Type | Price Range | Search —
// echoing a familiar real-estate-marketplace search pattern.
export default function FilterBar({
  city,
  onCityChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  typeFilter,
  onTypeFilterChange,
  propertyTypes,
  onSubmit,
}: FilterBarProps) {
  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col lg:flex-row lg:items-center gap-1.5">
        {/* Location */}
        <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
          <LocationPinIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            placeholder="Location, City, or ZIP"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          />
        </div>

        <div className="hidden lg:block w-px h-8 bg-slate-200"></div>

        {/* Property type */}
        <div className="flex items-center gap-2 px-4 py-3 lg:w-44 shrink-0">
          <HomeIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none appearance-none"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "Property Type" : type}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden lg:block w-px h-8 bg-slate-200"></div>

        {/* Price range */}
        <div className="flex items-center gap-2 px-4 py-3 lg:w-56 shrink-0">
          <DollarIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="number"
            min={0}
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
          <span className="text-slate-300 shrink-0">–</span>
          <input
            type="number"
            min={0}
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary py-3.5 px-7 shrink-0">
          <SearchIcon className="w-4 h-4" /> Search
        </button>
      </div>
    </form>
  );
}
