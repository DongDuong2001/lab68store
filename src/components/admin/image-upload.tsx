"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  label,
  required = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        const error = await res.json();
        alert(error.error || "Upload failed");
      }
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold uppercase mb-2">
        {label} {required && "*"}
      </label>

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover border-4 border-black"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-2 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="neo-card p-8 cursor-pointer hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-4 text-center"
        >
          {uploading ? (
            <div className="text-sm font-bold uppercase">Uploading...</div>
          ) : (
            <>
              <Upload size={32} />
              <div>
                <p className="text-sm font-bold uppercase">Click to upload</p>
                <p className="text-xs text-gray-500 mt-1">
                  JPEG, PNG, WebP, GIF (max 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="neo-input w-full mt-2"
        placeholder="Or paste image URL"
      />
    </div>
  );
}

interface MultiImageUploadProps {
  values: string;
  onChange: (urls: string) => void;
  label: string;
}

export function MultiImageUpload({
  values,
  onChange,
  label,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const urlArray = values
    .split("\n")
    .map((u) => u.trim())
    .filter((u) => u);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          return data.url;
        }
        return null;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url) => url !== null);

      if (validUrls.length > 0) {
        const newUrls = [...urlArray, ...validUrls].join("\n");
        onChange(newUrls);
      }
    } catch (error) {
      alert("Failed to upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newUrls = urlArray
      .filter((_, index) => index !== indexToRemove)
      .join("\n");
    onChange(newUrls);
  };

  return (
    <div>
      <label className="block text-sm font-bold uppercase mb-2">{label}</label>

      {urlArray.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {urlArray.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-32 object-cover border-4 border-black"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="neo-card p-8 cursor-pointer hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-4 text-center mb-2"
      >
        {uploading ? (
          <div className="text-sm font-bold uppercase">Uploading...</div>
        ) : (
          <>
            <ImageIcon size={32} />
            <div>
              <p className="text-sm font-bold uppercase">
                Click to upload multiple images
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, WebP, GIF (max 5MB each)
              </p>
            </div>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        multiple
      />

      <textarea
        value={values}
        onChange={(e) => onChange(e.target.value)}
        className="neo-input w-full"
        rows={3}
        placeholder="Or paste URLs (one per line)"
      />
    </div>
  );
}
