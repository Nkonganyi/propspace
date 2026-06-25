import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/propertyService";
import InputField from "../components/InputField";
import ImageUploadInput from "../components/ImageUploadInput";
import { AlertCircleIcon, PlusIcon, XIcon, ImageIcon } from "../components/icons";

export default function CreateProperty() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    city: "",
    country: "",
    propertyType: "Apartment",
  });
  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const updateImage = (index: number, value: string) => {
    const next = [...images];
    next[index] = value;
    setImages(next);
  };

  const addImageField = () => setImages([...images, ""]);

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.city.trim() || !form.description.trim() || !form.country.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    if (!form.price || form.price <= 0) {
      setError("Please enter a valid price greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanImages = images.map((url) => url.trim()).filter(Boolean);
      await createProperty({ ...form, images: cleanImages });
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
              <AlertCircleIcon className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-10">
            {/* Section: Basic information */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
                Basic Information
              </h2>
              <div className="space-y-5">
                <InputField
                  label="Property Title"
                  placeholder="Beautiful Modern Apartment"
                  onChange={(e) => update("title", e.target.value)}
                  value={form.title}
                  required
                />

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
                <InputField
                  label="Price ($)"
                  type="number"
                  min={1}
                  placeholder="250000"
                  onChange={(e) => update("price", Number(e.target.value))}
                  value={form.price || ""}
                  required
                />

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
                <InputField
                  label="City"
                  placeholder="New York"
                  onChange={(e) => update("city", e.target.value)}
                  value={form.city}
                  required
                />

                <InputField
                  label="Country"
                  placeholder="United States"
                  onChange={(e) => update("country", e.target.value)}
                  value={form.country}
                  required
                />
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Section: Photos */}
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Photos
              </h2>
              <div className="space-y-5">
                {images.map((url, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <ImageUploadInput
                        label={`Image ${index + 1}`}
                        value={url}
                        onChange={(value) => updateImage(index, value)}
                      />
                    </div>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="btn btn-ghost px-3.5 py-3.5 text-error-600 shrink-0 mt-7"
                        aria-label="Remove image"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addImageField}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline transition-all duration-200"
                >
                  <PlusIcon className="w-4 h-4" /> Add another image
                </button>
              </div>
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
