import { useState } from "react";
import type { Property } from "../types/Property";
import { deleteProperty, updateProperty } from "../services/propertyService";
import { useNavigate, useLocation } from "react-router-dom";
import { LocationPinIcon, EditIcon, TrashIcon } from "./icons";

export default function PropertyCard({ property }: { property: Property }) {
  const nav = useNavigate();
  const location = useLocation();
  const isMyListing = location.pathname === "/mine";
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(property.title);

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    setLoading(true);
    await deleteProperty(property._id);
    nav(0);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    setLoading(true);
    await updateProperty(property._id, { title: editTitle });
    setIsEditing(false);
    nav(0);
  };

  return (
    <div className="surface-card surface-card-hover overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Property type tag, overlaid on the image */}
        <span className="absolute top-3 left-3 badge bg-white/90 text-slate-700 backdrop-blur-sm shadow-sm">
          {property.propertyType}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="field-input text-base font-semibold"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={saveEdit}
                disabled={loading}
                className="btn btn-primary flex-1 py-2.5 text-sm"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(property.title);
                }}
                className="btn btn-ghost flex-1 py-2.5 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
              {property.title}
            </h2>
            <p className="text-slate-500 line-clamp-2 leading-relaxed text-sm mt-1.5">
              {property.description}
            </p>

            <span className="badge badge-neutral mt-3 self-start">
              <LocationPinIcon className="w-3.5 h-3.5" />
              {property.city}, {property.country}
            </span>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
              <p className="text-2xl font-extrabold text-primary">
                ${property.price.toLocaleString()}
              </p>
            </div>

            {isMyListing && (
              <div className="flex gap-3 pt-4 mt-auto">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary flex-1 py-2.5 text-sm"
                >
                  <EditIcon className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={remove}
                  disabled={loading}
                  className="btn btn-danger flex-1 py-2.5 text-sm"
                >
                  <TrashIcon className="w-3.5 h-3.5" /> {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
