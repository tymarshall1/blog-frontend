import puppyHeroLg from "../assets/puppy-hero-lg.jpg";
import { Button } from "@/components/ui/button";
import puppyAbout from "../assets/puppy-about.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pawPrint from "../assets/Paw_Print.svg";
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

type FeaturedArticleProps = {
  title: string;
  body: string;
};

type Article = {
  title: string;
  body: string;
};

function FeaturedArticle(props: FeaturedArticleProps) {
  function limitCharacters(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }
  return (
    <div className="flex flex-col justify-between flex-1 p-4 border-2 border-gray-500 rounded">
      <h2 className="mb-2 text-2xl font-bold text-center capitalize">
        {props.title}
      </h2>
      <p className="mb-2">{limitCharacters(props.body, 250)}</p>
      <Button className="block mx-auto " size={"lg"} variant={"secondary"}>
        <Link to={"/"}>Read More</Link>
      </Button>
    </div>
  );
}

function FeaturedArticles() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[] | null>(
    null
  );
  useEffect(() => {
    fetch("http://localhost:3000/api/articles")
      .then((response) => response.json())
      .then((data) => setFeaturedArticles(data));
  }, []);

  return (
    <section className="p-4 text-white bg-primary">
      <div className="flex items-center justify-center mb-4">
        <img className="w-20 h-20" src={pawPrint} alt="" />
        <h1 className="text-5xl font-black text-center ">
          Featured <span className="text-gray-500 ">Articles</span>
        </h1>
        <img className="w-20 h-20" src={pawPrint} alt="" />
      </div>
      {featuredArticles && (
        <div className="flex flex-col gap-4 md:flex-row justify-evenly">
          <FeaturedArticle
            title={featuredArticles[0].title}
            body={featuredArticles[0].body}
          />
          <FeaturedArticle
            title={featuredArticles[1].title}
            body={featuredArticles[1].body}
          />
          <FeaturedArticle
            title={featuredArticles[2].title}
            body={featuredArticles[2].body}
          />
        </div>
      )}
    </section>
  );
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
