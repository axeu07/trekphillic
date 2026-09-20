import { TrekEditor } from "@/components/superadmin/trek-editor/TrekEditor";

export const metadata = { title: "Add Trek" };

export default function NewTrekPage() {
  return <TrekEditor mode="create" />;
}