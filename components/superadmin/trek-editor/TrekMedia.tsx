import { EditorSection } from "@/components/superadmin/trek-editor/EditorSection";
import { ImageUploader } from "@/components/superadmin/trek-editor/ImageUploader";
import { MultiImageUploader } from "@/components/superadmin/trek-editor/MultiImageUploader";
import type { TrekEditorErrors, TrekEditorState } from "@/components/superadmin/trek-editor/types";

export function TrekMedia({ state, errors, onChange, onPendingCoverChange, onPendingGalleryChange }: { state: TrekEditorState; errors: TrekEditorErrors; onChange: <K extends keyof TrekEditorState>(key: K, value: TrekEditorState[K]) => void; onPendingCoverChange: (hasFile: boolean) => void; onPendingGalleryChange: (hasFiles: boolean) => void }) {
  return <EditorSection eyebrow="06 / Visuals" title="Media"><div className="space-y-8"><ImageUploader error={errors.coverImage} onChange={(value) => onChange("coverImage", value)} onPendingFileChange={onPendingCoverChange} slug={state.slug} value={state.coverImage} /><MultiImageUploader onChange={(values) => onChange("gallery", values)} onPendingFilesChange={onPendingGalleryChange} slug={state.slug} values={state.gallery} /></div></EditorSection>;
}