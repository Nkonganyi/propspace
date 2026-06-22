import { useEffect, useMemo, useState } from "react";
import { getMine } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import type { Property } from "../types/Property";
import { Link, useNavigate } from "react-router-dom";

export default function MyListings() {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getMine();
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

  // Derived purely from already-fetched data — no additional API calls.
  const stats = useMemo(() => {
    const total = data.length;
    const totalValue = data.reduce((sum, p) => sum + (p.price || 0), 0);
    const avgPrice = total ? Math.round(totalValue / total) : 0;
    return { total, totalValue, avgPrice };
  }, [data]);

  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              My Listings
            </h1>
            <p className="text-slate-500">Manage your property listings</p>
          </div>
          <Link
            to="/create"
            className="btn btn-primary"
          >
            ➕ New Listing
          </Link>
        </div>

        {/* Statistics cards */}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="surface-card p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Listings</p>
              <p className="text-3xl font-extrabold text-slate-900">{stats.total}</p>
            </div>
            <div className="surface-card p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-extrabold text-primary">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="surface-card p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Average Price</p>
              <p className="text-3xl font-extrabold text-accent-600">
                ${stats.avgPrice.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <ErrorState
            message="We couldn't reach the server to load your listings."
            onRetry={load}
          />
        ) : !data.length ? (
          <EmptyState
            icon="🏠"
            title="You haven't listed any properties yet"
            description="Create your first listing to get started!"
            actionLabel="Create First Listing"
            onAction={() => nav("/create")}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {data.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
