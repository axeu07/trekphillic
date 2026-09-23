"use client";

import { useEffect, useRef, useState } from "react";
import { createLocalImagePreview, imageAccept, revokeLocalImagePreview, uploadImage, validateImageFile, type LocalImagePreview, type UploadedImage } from "@/lib/media/upload";
import { ImagePreview, LocalPreviewImage } from "@/components/superadmin/trek-editor/ImagePreview";

export function ImageUploader({ value, slug, error, onChange, onPendingFileChange }: { value: string; slug: string; error?: string; onChange: (value: string) => void; onPendingFileChange: (hasFile: boolean, upload?: () => Promise<UploadedImage>) => void }) {
  const [preview, setPreview] = useState<LocalImagePreview>();
  const [pendingFile, setPendingFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadVersion = useRef(0);

  useEffect(() => () => { if (preview) revokeLocalImagePreview(preview); }, [preview]);

  const uploadSelectedFile = async (file: File, version: number) => {
    setUploading(true);
    setFailed(false);
    try {
      const result = await uploadImage(file, { kind: "cover", slug });
      if (version !== uploadVersion.current) return;
      setPreview(undefined);
      setPendingFile(undefined);
      setUploading(false);
      onPendingFileChange(false);
      onPendingFileChange(false);
      onChange(result.secureUrl);
      return result;
    } catch (error) {
      setUploading(false);
      setFailed(true);
      setUploadError(error instanceof Error ? error.message : "The image could not be uploaded. Please try again.");
      onPendingFileChange(true);
      throw error;
    }
  };
  const selectFile = (file?: File) => {
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) { setUploadError(validationError); return; }
    setUploadError("");
    setPreview(createLocalImagePreview(file));
    setPendingFile(file);
    const version = ++uploadVersion.current;
    onPendingFileChange(true, async () => {
      const result = await uploadSelectedFile(file, version);
      if (!result) throw new Error("The cover image selection changed before upload.");
      return result;
    });
  };
  const remove = () => { uploadVersion.current += 1; setPreview(undefined); setPendingFile(undefined); setUploading(false); setFailed(false); setUploadError(""); onPendingFileChange(false); onChange(""); };
  const choose = () => inputRef.current?.click();

  return <div><input accept={imageAccept} className="sr-only" onChange={(event) => { selectFile(event.target.files?.[0]); event.target.value = ""; }} ref={inputRef} type="file" /><div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); selectFile(event.dataTransfer.files[0]); }}><label className="block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">Cover image<span aria-hidden="true" className="ml-1 text-sunrise">*</span></label>{preview ? <div className="mt-2"><LocalPreviewImage alt="Selected cover preview" onChange={choose} onRemove={remove} onRetry={() => { if (pendingFile) { const version = ++uploadVersion.current; void uploadSelectedFile(pendingFile, version); } }} preview={preview} removeLabel="Remove cover image" status={uploading ? "uploading" : failed ? "failed" : undefined} /></div> : value ? <div className="mt-2"><ImagePreview alt="Existing cover image" onChange={choose} onRemove={remove} removeLabel="Remove cover image" src={value} /></div> : <button className={`mt-2 flex min-h-48 w-full flex-col items-center justify-center border border-dashed bg-background px-5 text-center transition-colors hover:border-teal ${error || uploadError ? "border-sunrise" : "border-border"}`} onClick={choose} type="button"><span className="text-2xl text-teal">+</span><span className="mt-2 text-sm font-semibold text-forest-deep">Upload cover image</span><span className="mt-1 text-xs text-foreground/50">JPG / PNG / WEBP</span><span className="text-xs text-foreground/50">Recommended landscape image</span></button>}<label className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Or use an image URL<input className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm normal-case tracking-normal outline-none focus:border-forest" onChange={(event) => { uploadVersion.current += 1; setPreview(undefined); setPendingFile(undefined); setUploading(false); setFailed(false); onPendingFileChange(false); onChange(event.target.value); }} placeholder="https://..." type="url" value={value} /></label></div>{uploadError ? <p className="mt-2 text-xs text-[#8a4d1e]">{uploadError}</p> : error ? <p className="mt-2 text-xs text-[#8a4d1e]">{error}</p> : null}</div>;
}