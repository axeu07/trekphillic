import { SectionHeading } from "./SectionHeading";

export function RouteIntro({ title, description }: { title: string; description: string }) {
  return <main className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10"><SectionHeading eyebrow="TrekPhillic" title={title} description={description} /></main>;
}