import { useEffect, useMemo, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import type { Property } from "../types/Property";

const PropertyCardSkeleton = () => (
  <div className="surface-card overflow-hidden animate-pulse">
    <div className="w-full h-52 bg-slate-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-3 bg-slate-200 rounded w-full"></div>
      <div className="h-3 bg-slate-200 rounded w-5/6"></div>
      <div className="h-6 bg-slate-200 rounded w-1/3 mt-4"></div>
    </div>
  </div>
);

// Client-side only — filters the listings already returned by getProperties().
// Does not call the API again and does not change the existing city search.
const PROPERTY_TYPES = ["All", "Apartment", "House", "Studio"];

export default function Properties() {
  const [data, setData] = useState<Property[]>([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("All");

  const load = async (searchCity = "") => {
    setLoading(true);
    const res = await getProperties(searchCity);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(city);
  };

  const visibleData = useMemo(
    () =>
      typeFilter === "All"
        ? data
        : data.filter((p) => p.propertyType === typeFilter),
    [data, typeFilter]
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary to-accent text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob absolute -top-20 -left-20 w-72 h-72 bg-white/15"></div>
          <div className="blob absolute -bottom-10 -right-10 w-96 h-96 bg-accent-300/25"></div>
        </div>

        <div className="container-page py-20 sm:py-28 relative z-10">
          <div className="text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-balance">
                Find Your <span className="text-accent-100">Dream Home</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-100/90 max-w-2xl mx-auto">
                Discover properties in prime locations. Your perfect home is just a click away.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl shadow-xl">
                <input
                  type="text"
                  className="flex-1 w-full px-5 py-3.5 text-base text-slate-900 bg-slate-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all duration-200 border border-slate-200"
                  placeholder="Search by city, neighborhood, or ZIP code..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary px-8 py-3.5 whitespace-nowrap"
                >
                  Search Properties
                </button>
              </div>

              {/* Filter bar — filters the currently loaded results by type */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out
                      ${typeFilter === type
                        ? "bg-white text-primary shadow-md"
                        : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 sm:py-24 flex-grow">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Featured Properties
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Handpicked properties in the most sought-after locations
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : !visibleData.length ? (
            <div className="relative text-center py-20 px-6 surface-card mx-auto max-w-2xl overflow-hidden">
              <div className="blob absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary-100"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center text-4xl mb-6">
                  🏚️
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No Properties Found
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {city
                    ? `We couldn't find any listings matching "${city}". Try a different location!`
                    : typeFilter !== "All"
                    ? `No ${typeFilter.toLowerCase()} listings right now. Try another category.`
                    : "It looks a little empty here. Be the first to list your property!"}
                </p>
                <button
                  onClick={() => {
                    setCity("");
                    setTypeFilter("All");
                    load("");
                  }}
                  className="btn btn-primary mt-8"
                >
                  Clear Filters & View All
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {visibleData.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-extrabold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🏘️</span>
                PropSpace
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Your trusted partner in finding the right property. We make your home search an exceptional experience.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-base">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-accent transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Our Agents</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-base">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            <p>© 2026 PropSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
