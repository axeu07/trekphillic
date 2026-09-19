import { RouteIntro } from "@/components/ui/RouteIntro";

export default async function TrekDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RouteIntro title="Trek details" description={`The ${slug.replaceAll("-", " ")} trek page is ready for its supplied itinerary and images.`} />;
}