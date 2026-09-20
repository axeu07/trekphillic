import { EditorSection, TextAreaField, TextField } from "@/components/superadmin/trek-editor/EditorSection";
import type { TrekEditorState } from "@/components/superadmin/trek-editor/types";

export function TrekSEO({ state, onChange }: { state: TrekEditorState; onChange: <K extends keyof TrekEditorState>(key: K, value: TrekEditorState[K]) => void }) {
  return <EditorSection eyebrow="08 / Search" title="SEO"><div className="space-y-5"><TextField label="SEO title" onChange={(value) => onChange("seoTitle", value)} value={state.seoTitle} /><div><TextAreaField label="SEO description" onChange={(value) => onChange("seoDescription", value)} rows={3} value={state.seoDescription} /><p className="mt-1 text-right text-xs text-foreground/45">{state.seoDescription.length}/160 characters</p></div></div></EditorSection>;
}