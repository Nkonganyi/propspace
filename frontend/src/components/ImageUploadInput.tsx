import { useId, useRef, useState } from "react";
import { uploadImage } from "../services/uploadService";
import { UploadIcon, AlertCircleIcon, LinkIcon } from "./icons";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // matches the backend's 5MB limit
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type ImageUploadInputProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

export default function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = "https://example.com/photo.jpg",
}: ImageUploadInputProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, WEBP, or GIF image");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err: any) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="field-input pl-10"
          />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn btn-ghost shrink-0 sm:w-auto"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          ) : (
            <UploadIcon className="w-4 h-4" />
          )}
          {uploading ? "Uploading..." : "Upload from device"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-sm text-error-600 mt-2">
          <AlertCircleIcon className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}

      {value && !error && (
        <img
          src={value}
          alt="Preview"
          className="mt-3 w-full h-32 object-cover rounded-xl border border-slate-200"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.display = "block";
          }}
        />
      )}
    </div>
  );
}
