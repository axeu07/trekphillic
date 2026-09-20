import { notFound } from "next/navigation";
import { TrekEditor } from "@/components/superadmin/trek-editor/TrekEditor";
import { getTreks } from "@/lib/treks/repository";

export const metadata = { title: "Edit Trek" };

export default async function EditTrekPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = (await getTreks()).find((record) => record.id === id);
  if (!trek) notFound();
  return <TrekEditor initialData={trek} mode="edit" />;
}