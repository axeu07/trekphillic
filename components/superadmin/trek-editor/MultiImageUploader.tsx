"use client";

import { useEffect, useRef, useState } from "react";
import { createLocalImagePreview, imageAccept, revokeLocalImagePreview, uploadImage, validateImageFile, type LocalImagePreview } from "@/lib/media/upload";
import { LocalPreviewImage, ImagePreview } from "@/components/superadmin/trek-editor/ImagePreview";

export function MultiImageUploader({ values, slug, onChange, onPendingFilesChange }: { values: string[]; slug: string; onChange: (values: string[]) => void; onPendingFilesChange: (hasFiles: boolean) => void }) {
  const [previews, setPreviews] = useState<LocalImagePreview[]>([]);
  const previewsRef = useRef<LocalImagePreview[]>([]);
  const valuesRef = useRef(values);
  const cancelledIds = useRef(new Set<string>());
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { previewsRef.current = previews; }, [previews]);
  useEffect(() => { valuesRef.current = values; }, [values]);
  useEffect(() => () => { previewsRef.current.forEach(revokeLocalImagePreview); }, []);

  const uploadPreview = async (preview: LocalImagePreview) => {
    cancelledIds.current.delete(preview.id);
    setPreviews((current) => current.map((item) => item.id === preview.id ? { ...item, status: "uploading" } : item));
    try {
      const secureUrl = await uploadImage(preview.file, { kind: "gallery", slug });
      if (cancelledIds.current.has(preview.id)) { revokeLocalImagePreview(preview); return; }
      const remaining = previewsRef.current.filter((item) => item.id !== preview.id);
      const nextValues = [...valuesRef.current, secureUrl];
      previewsRef.current = remaining;
      valuesRef.current = nextValues;
      setPreviews(remaining);
      onChange(nextValues);
      onPendingFilesChange(remaining.length > 0);
      revokeLocalImagePreview(preview);
    } catch (error) {
      setPreviews((current) => current.map((item) => item.id === preview.id ? { ...item, status: "failed", error: error instanceof Error ? error.message : "The image could not be uploaded. Please try again." } : item));
    }
  };

  const selectFiles = (files: FileList | File[]) => {
    const nextPreviews: LocalImagePreview[] = [];
    for (const file of Array.from(files)) { const validationError = validateImageFile(file); if (validationError) { setUploadError(validationError); continue; } nextPreviews.push(createLocalImagePreview(file)); }
    if (!nextPreviews.length) return;
    setUploadError("");
    const next = [...previewsRef.current, ...nextPreviews];
    previewsRef.current = next;
    setPreviews(next);
    onPendingFilesChange(true);
    nextPreviews.forEach((preview) => { void uploadPreview(preview); });
  };
  const removePreview = (id: string) => { cancelledIds.current.add(id); const removed = previewsRef.current.find((preview) => preview.id === id); const next = previewsRef.current.filter((preview) => preview.id !== id); if (removed) revokeLocalImagePreview(removed); previewsRef.current = next; setPreviews(next); onPendingFilesChange(next.length > 0); };
  const choose = () => inputRef.current?.click();

  return <div><input accept={imageAccept} className="sr-only" multiple onChange={(event) => { if (event.target.files) selectFiles(event.target.files); event.target.value = ""; }} ref={inputRef} type="file" /><div className="flex items-center justify-between gap-4"><h3 className="text-sm font-semibold text-forest-deep">Gallery</h3><button className="text-sm font-semibold text-teal underline underline-offset-4" onClick={choose} type="button">+ Add images</button></div>{uploadError ? <p className="mt-2 text-xs text-[#8a4d1e]">{uploadError}</p> : null}<div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="contents">{values.map((image, index) => <ImagePreview alt={`Gallery image ${index + 1}`} key={`existing-${image}-${index}`} onRemove={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} removeLabel={`Remove gallery image ${index + 1}`} src={image} />)}</div>{previews.map((preview, index) => <LocalPreviewImage alt={`Selected gallery preview ${index + 1}`} error={preview.error} key={preview.id} onRemove={() => removePreview(preview.id)} onRetry={() => { void uploadPreview(preview); }} preview={preview} removeLabel={`Remove selected gallery image ${index + 1}`} status={preview.status} />)}</div>{!values.length && !previews.length ? <button className="mt-3 flex min-h-28 w-full items-center justify-center border border-dashed border-border text-sm text-foreground/50 hover:border-teal" onClick={choose} type="button">Select gallery images from your device</button> : null}</div>;
}