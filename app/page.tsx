import {
  CallToAction,
  ExperienceSection,
  Hero,
  PopularTreks,
  TravellerStories,
  TripPlanner,
  TourPackages,
  Vehicles,
  WhyTrekPhillic,
} from "@/components/home/HomepageSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="main-content-background">
        <TripPlanner />
        <PopularTreks />
        <ExperienceSection />
        <WhyTrekPhillic />
        <TourPackages />
        <Vehicles />
        <TravellerStories />
        <CallToAction />
      </div>
    </main>
  );
}
