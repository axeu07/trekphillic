import { RouteIntro } from "@/components/ui/RouteIntro";

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RouteIntro title="Vehicle details" description={`The ${slug.replaceAll("-", " ")} vehicle page is ready for its supplied specifications and images.`} />;
}