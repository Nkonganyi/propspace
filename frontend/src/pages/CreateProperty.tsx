import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/propertyService";

export default function CreateProperty() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    city: "",
    country: "",
    propertyType: "Apartment",
    images: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.city || !form.price || !form.description || !form.country) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createProperty(form);
      nav("/mine");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-card p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Create New Listing
            </h1>
            <p className="text-slate-500">Add your property to the marketplace</p>
          </div>

          {error && (
            <div className="alert-error mb-8">
              <span>❌</span> {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-10">
            {/* Section: Basic information */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
                Basic Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="field-label">
                    Property Title
                  </label>
                  <input
                    className="field-input"
                    placeholder="Beautiful Modern Apartment"
                    onChange={(e) => update("title", e.target.value)}
                    value={form.title}
                  />
                </div>

                <div>
                  <label className="field-label">
                    Description
                  </label>
                  <textarea
                    className="field-input resize-none"
                    rows={4}
                    placeholder="Describe your property in detail..."
                    onChange={(e) => update("description", e.target.value)}
                    value={form.description}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Section: Pricing & type */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
                Pricing & Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="field-input"
                    placeholder="250000"
                    onChange={(e) => update("price", Number(e.target.value))}
                    value={form.price || ""}
                  />
                </div>

                <div>
                  <label className="field-label">
                    Property Type
                  </label>
                  <select
                    className="field-input field-select"
                    onChange={(e) => update("propertyType", e.target.value)}
                    value={form.propertyType}
                  >
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Studio</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Section: Location */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
                Location
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">
                    City
                  </label>
                  <input
                    className="field-input"
                    placeholder="New York"
                    onChange={(e) => update("city", e.target.value)}
                    value={form.city}
                  />
                </div>

                <div>
                  <label className="field-label">
                    Country
                  </label>
                  <input
                    className="field-input"
                    placeholder="United States"
                    onChange={(e) => update("country", e.target.value)}
                    value={form.country}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Section: Photos */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
                Photos
              </h2>
              <div>
                <label className="field-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="https://example.com/property.jpg"
                  onChange={(e) => update("images", [e.target.value])}
                  value={form.images[0]}
                />
              </div>

              {form.images[0] && (
                <div className="pt-4">
                  <img
                    src={form.images[0]}
                    alt="Property Preview"
                    className="w-full h-64 object-cover rounded-xl border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-base"
            >
              {loading ? "Creating Listing..." : "Publish Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
