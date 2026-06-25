import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../services/propertyService";
import { useAuth } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import type { Property } from "../types/Property";
import { Logo, SearchIcon } from "../components/icons";

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

// "All" plus the property types the backend accepts; client-side only, used
// to narrow the listings already returned by the current city/price search.
const PROPERTY_TYPES = ["All", "Apartment", "House", "Studio"];

const CATEGORIES = [
  {
    type: "Apartment",
    label: "Apartments",
    image: "https://images.unsplash.com/photo-1752293451299-fca611e46389?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "House",
    label: "Houses",
    image: "https://images.unsplash.com/photo-1760067537293-6b30141d6a52?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "Studio",
    label: "Studios",
    image: "https://images.unsplash.com/photo-1748679767437-00b5c0327b1a?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Properties() {
  const { user } = useAuth();
  const [data, setData] = useState<Property[]>([]);
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");

  const load = async (filters: { city?: string; minPrice?: string; maxPrice?: string } = {}) => {
    setLoading(true);
    setError(false);
    try {
      const res = await getProperties(filters);
      setData(res);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load({ city, minPrice, maxPrice });
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setTypeFilter("All");
    load({});
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of data) {
      counts[p.propertyType] = (counts[p.propertyType] || 0) + 1;
    }
    return counts;
  }, [data]);

  const visibleData = useMemo(
    () =>
      typeFilter === "All"
        ? data
        : data.filter((p) => p.propertyType === typeFilter),
    [data, typeFilter]
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section — dark cityscape backdrop, light search bar floating on top */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1757340347257-c45bb8589615?auto=format&fit=crop&w=1740&q=80')",
          }}
        ></div>
        {/* Multi-stop overlay: darkest where the headline/search sit, fading to
            the page background at the bottom for a smooth transition. */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-50"></div>
        <div className="absolute inset-0 bg-slate-950/25"></div>

        <div className="container-page relative z-10 py-20 sm:py-28 pb-24">
          <div className="text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance text-white [text-shadow:_0_2px_16px_rgb(0_0_0_/_50%)]">
                Find your next <span className="text-accent-300">masterpiece</span>
              </h1>
              <p className="text-lg text-slate-100 max-w-2xl mx-auto [text-shadow:_0_1px_8px_rgb(0_0_0_/_60%)]">
                Browse exclusive listings — from cozy studios to sprawling family homes.
              </p>
            </div>

            <FilterBar
              city={city}
              onCityChange={setCity}
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              propertyTypes={PROPERTY_TYPES}
              onSubmit={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Explore Categories
              </h2>
              <p className="text-slate-500">Hand-picked collections for your lifestyle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.type}
                onClick={() => {
                  setTypeFilter(cat.type);
                  document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative h-44 rounded-2xl overflow-hidden text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-slate-900/10"></div>
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <span className="text-white text-xl font-bold drop-shadow-sm">{cat.label}</span>
                  <span className="text-white/80 text-sm">
                    {categoryCounts[cat.type] || 0} Properties
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section id="listings" className="py-4 sm:py-8 pb-16 sm:pb-24 flex-grow">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Recent Listings
              </h2>
              <p className="text-slate-500">Handpicked properties in the most sought-after locations</p>
            </div>
            {typeFilter !== "All" && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-primary hover:underline transition-all duration-200 shrink-0"
              >
                Clear filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              message="We couldn't reach the server to load property listings."
              onRetry={() => load({ city, minPrice, maxPrice })}
            />
          ) : !visibleData.length ? (
            <EmptyState
              icon={<SearchIcon className="w-9 h-9" />}
              title="No Properties Found"
              description={
                city || minPrice || maxPrice
                  ? "We couldn't find any listings matching your search. Try different filters!"
                  : typeFilter !== "All"
                  ? `No ${typeFilter.toLowerCase()} listings right now. Try another category.`
                  : "It looks a little empty here. Be the first to list your property!"
              }
              actionLabel="Clear Filters & View All"
              onAction={clearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {visibleData.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to list your property?
            </h3>
            <p className="text-slate-400 max-w-md">
              Join PropSpace and put your listing in front of buyers and renters actively searching.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to={user ? "/create" : "/register"}
              className="btn bg-white text-slate-900 hover:bg-slate-100 px-8 py-3.5 shadow-sm"
            >
              List Your Property
            </Link>
            <Link
              to="/mine"
              className="btn border border-slate-600 text-white hover:bg-slate-800 px-8 py-3.5"
            >
              {user ? "My Listings" : "Sign Up Free"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-extrabold text-white mb-4 flex items-center gap-3">
                <Logo className="w-7 h-7" />
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
