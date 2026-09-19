import { RouteIntro } from "@/components/ui/RouteIntro";

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RouteIntro title="Tour details" description={`The ${slug.replaceAll("-", " ")} tour page is ready for its supplied itinerary and images.`} />;
}