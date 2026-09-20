"use client";

import Link from "next/link";
import { useState } from "react";
import { TrekBasicInfo } from "@/components/superadmin/trek-editor/TrekBasicInfo";
import { TrekContent } from "@/components/superadmin/trek-editor/TrekContent";
import { TrekEssentials } from "@/components/superadmin/trek-editor/TrekEssentials";
import { TrekItinerary } from "@/components/superadmin/trek-editor/TrekItinerary";
import { TrekMedia } from "@/components/superadmin/trek-editor/TrekMedia";
import { TrekPublishing } from "@/components/superadmin/trek-editor/TrekPublishing";
import { TrekSEO } from "@/components/superadmin/trek-editor/TrekSEO";
import { TrekTripDetails } from "@/components/superadmin/trek-editor/TrekTripDetails";
import type { Trek, TrekEssential } from "@/types/trek";
import type { TrekEditorErrors, TrekEditorProps, TrekEditorState, TrekEditorStatus } from "@/components/superadmin/trek-editor/types";

const essentialLabels = ["Fitness", "Weather", "Accommodation", "Food", "Transport"] as const;
const defaultEssentials: TrekEssential[] = essentialLabels.map((label) => ({ label, detail: "" }));

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function editorStateFromTrek(trek?: Trek): TrekEditorState {
  return {
    name: trek?.name ?? "",
    slug: trek?.slug ?? "",
    shortDescription: trek?.shortDescription ?? "",
    location: trek?.location ?? "",
    state: trek?.state ?? "",
    startingPoint: trek?.startingPoint ?? "",
    endingPoint: trek?.endingPoint ?? "",
    duration: trek?.duration ?? "",
    distance: trek?.distance ?? "",
    altitude: trek?.altitude ?? "",
    difficulty: trek?.difficulty ?? "moderate",
    bestSeason: trek?.bestSeason ?? "",
    storyHeading: trek?.story.heading ?? "",
    storyParagraphs: trek?.story.paragraphs.join("\n\n") ?? "",
    highlights: [...(trek?.highlights ?? [])],
    experience: trek?.experience.map((item) => ({ ...item })) ?? [],
    itinerary: trek?.itinerary.map((item) => ({ ...item })) ?? [],
    essentials: trek?.essentials.map((item) => ({ ...item })) ?? defaultEssentials.map((item) => ({ ...item })),
    whatToCarry: [...(trek?.whatToCarry ?? [])],
    coverImage: trek?.coverImage ?? "",
    gallery: [...(trek?.gallery ?? [])],
    status: trek?.published ? "published" : "draft",
    featured: trek?.featured ?? false,
    seoTitle: trek?.seoTitle ?? "",
    seoDescription: trek?.seoDescription ?? "",
  };
}

function buildTrek(state: TrekEditorState, initialData: Trek | undefined, status: TrekEditorStatus): Trek {
  return {
    ...(initialData ?? {}),
    id: initialData?.id ?? `trek-${state.slug}`,
    slug: state.slug.trim(),
    name: state.name.trim(),
    shortDescription: state.shortDescription.trim(),
    location: state.location.trim(),
    state: state.state.trim(),
    startingPoint: state.startingPoint.trim(),
    endingPoint: state.endingPoint.trim(),
    altitude: state.altitude.trim(),
    distance: state.distance.trim(),
    duration: state.duration.trim(),
    difficulty: state.difficulty,
    bestSeason: state.bestSeason.trim(),
    coverImage: state.coverImage.trim(),
    gallery: state.gallery.map((image) => image.trim()).filter(Boolean),
    story: { heading: state.storyHeading.trim(), paragraphs: state.storyParagraphs.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean) },
    highlights: state.highlights.map((highlight) => highlight.trim()).filter(Boolean),
    experience: state.experience.map((item) => ({ ...item, title: item.title.trim(), description: item.description.trim(), image: item.image.trim() })),
    itinerary: state.itinerary.map((item) => ({ ...item })),
    essentials: state.essentials.map((item) => ({ ...item })),
    whatToCarry: state.whatToCarry.map((item) => item.trim()).filter(Boolean),
    featured: state.featured,
    published: status === "published",
    seoTitle: state.seoTitle.trim() || undefined,
    seoDescription: state.seoDescription.trim() || undefined,
    tags: initialData?.tags ?? [],
  };
}

export function TrekEditor({ mode, initialData, onSave }: TrekEditorProps) {
  const [state, setState] = useState(() => editorStateFromTrek(initialData));
  const [errors, setErrors] = useState<TrekEditorErrors>({});
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === "edit");
  const [saveMessage, setSaveMessage] = useState("");
  const [hasPendingCover, setHasPendingCover] = useState(false);
  const [hasPendingGallery, setHasPendingGallery] = useState(false);

  const update = <K extends keyof TrekEditorState>(key: K, value: TrekEditorState[K]) => setState((current) => ({ ...current, [key]: value }));
  const updateName = (name: string) => setState((current) => ({ ...current, name, slug: slugManuallyEdited ? current.slug : slugify(name) }));
  const updateBasicInfo = <K extends keyof TrekEditorState>(key: K, value: TrekEditorState[K]) => { if (key === "slug") setSlugManuallyEdited(true); if (key === "name") updateName(String(value)); else update(key, value); };

  const validate = () => {
    const nextErrors: TrekEditorErrors = {};
    const required: Array<[keyof TrekEditorState, string]> = [["name", "Name is required."], ["slug", "Slug is required."], ["shortDescription", "Short description is required."], ["location", "Location is required."], ["duration", "Duration is required."]];
    required.forEach(([key, message]) => { if (!String(state[key]).trim()) nextErrors[key] = message; });
    if (!state.coverImage.trim() && !hasPendingCover) nextErrors.coverImage = "Cover image is required.";
    if (state.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(state.slug)) nextErrors.slug = "Use lowercase letters, numbers, and single hyphens.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async (status: TrekEditorStatus) => {
    if (!validate()) { setSaveMessage("Complete the highlighted fields before saving."); return; }
    const payload = buildTrek(state, initialData, status);
    update("status", status);
    if (onSave) await onSave(payload);
    setSaveMessage(`${status === "published" ? "Publish" : "Save draft"} payload prepared locally. Persistence is not connected yet.${hasPendingCover || hasPendingGallery ? " Local image previews are not saved." : ""}`);
  };

  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16"><header className="flex flex-col justify-between gap-5 border-b border-foreground/15 pb-8 sm:flex-row sm:items-end"><div><Link className="text-xs font-semibold uppercase tracking-[0.18em] text-teal hover:text-forest" href="/superadmin/treks">SuperAdmin / Treks</Link><h1 className="mt-3 font-[family-name:var(--font-poppins)] text-4xl font-semibold tracking-[-0.06em] text-forest-deep sm:text-5xl">{mode === "create" ? "Add trek" : `Edit ${state.name || "trek"}`}</h1><p className="mt-3 text-sm text-foreground/65">Build the story, route, and practical details for this journey.</p></div><p className="text-xs uppercase tracking-[0.14em] text-foreground/45">{mode === "create" ? "New record" : "Editing record"}</p></header><form className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]" onSubmit={(event) => event.preventDefault()}><div><TrekBasicInfo errors={errors} onChange={updateBasicInfo} state={state} /><TrekTripDetails onChange={update} state={state} /><TrekContent onChange={update} state={state} /><TrekItinerary onChange={update} state={state} /><TrekEssentials onChange={update} state={state} /><TrekMedia errors={errors} onChange={update} onPendingCoverChange={setHasPendingCover} onPendingGalleryChange={setHasPendingGallery} state={state} /><TrekPublishing onChange={update} state={state} /><TrekSEO onChange={update} state={state} /></div><aside className="lg:sticky lg:top-6"><div className="border border-foreground/15 bg-surface p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Publish</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-forest-deep">{state.name || "Untitled trek"}</h2><p className="mt-2 text-sm leading-6 text-foreground/60">{state.location || "No location yet"} {state.duration ? ` / ${state.duration}` : ""}</p><div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-foreground/55"><p>Status: <strong className="text-foreground">{state.status === "published" ? "Published" : "Draft"}</strong></p><p>Featured: <strong className="text-foreground">{state.featured ? "Yes" : "No"}</strong></p></div>{errors.form ? <p className="mt-4 text-xs text-[#8a4d1e]">{errors.form}</p> : null}{saveMessage ? <p aria-live="polite" className="mt-4 border-l-2 border-teal pl-3 text-xs leading-5 text-foreground/65">{saveMessage}</p> : null}<div className="mt-6 grid gap-2"><button className="min-h-11 border border-border px-4 text-sm font-semibold text-forest transition-colors hover:border-forest" onClick={() => handleSave("draft")} type="button">Save draft</button><button className="min-h-11 bg-forest px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-deep" onClick={() => handleSave("published")} type="button">Publish trek</button></div></div></aside></form></div></main>;
}