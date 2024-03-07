import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PreviewArticleProps = {
  title: string;
  body: string;
};

type Article = {
  title: string;
  body: string;
  id: string;
};

function PreviewArticle(props: PreviewArticleProps) {
  function limitCharacters(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }
  return (
    <div className="flex flex-col justify-between flex-1 p-4 border-2 rounded border-primary">
      <h2 className="mb-2 text-2xl font-bold text-center underline capitalize text-primary">
        {props.title}
      </h2>
      <p className="mb-2">{limitCharacters(props.body, 250)}</p>

      <Link to={"/"}>
        <Button className="block mx-auto " size={"lg"} variant={"secondary"}>
          Read More
        </Button>
      </Link>
    </div>
  );
}

function Articles() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[] | null>(
    null
  );
  useEffect(() => {
    fetch("http://localhost:3000/api/articles")
      .then((response) => response.json())
      .then((data) => setFeaturedArticles(data));
  }, []);
  return (
    <div>
      <h1 className="p-10 text-6xl font-black text-center text-primary">
        Articles
      </h1>
      <div className="grid gap-4 p-4 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {featuredArticles &&
          featuredArticles.map((article) => {
            return (
              <PreviewArticle
                key={article.id}
                title={article.title}
                body={article.body}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Articles;
