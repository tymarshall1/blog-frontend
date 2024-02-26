import puppyHeroLg from "../assets/puppy-hero-lg.jpg";
import { Button } from "@/components/ui/button";
import puppyAbout from "../assets/puppy-about.jpg";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="p-8 bg-primary ">
      <div className="grid gap-8 mx-auto max-w-7xl lg:grid-cols-2">
        <img src={puppyHeroLg} className="rounded-xl" alt="" />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-6xl font-black text-center text-white ">
            Canine Chronicles
          </h1>
          <h2 className="text-xl font-medium text-center text-white ">
            Unleashing Dog Love & Knowledge
          </h2>
          <Button size={"lg"} variant={"secondary"}>
            <Link to={"/articles"}>Explore Our Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="max-w-3xl p-4 mx-auto space-y-4">
      <h1 className="text-4xl font-black text-center text-primary ">
        About Canine Chronicles
      </h1>
      <p>
        Canine Chronicles was born from a love of all things dog! Whether you're
        a seasoned dog owner, a new puppy parent, or simply someone who adores
        our furry companions, we're here to be your one-stop shop for dog
        knowledge and inspiration.
      </p>
      <img src={puppyAbout} className="rounded-xl" alt="" />
      <p>
        We aim to provide you with informative and engaging articles on various
        dog-related topics, from training and behavior advice to health and
        wellness tips, fun activities, and heartwarming stories. Our goal is to
        empower you to give your canine friend the best life possible while
        fostering a deeper understanding and appreciation for the incredible
        bond we share with our dogs.
      </p>
      <Button className="block mx-auto" size={"lg"} variant={"default"}>
        <Link to={"/about"}>Read More About Us</Link>
      </Button>
    </section>
  );
}

function FeaturedArticles() {
  return <section></section>;
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedArticles />
    </>
  );
}

export default Home;
