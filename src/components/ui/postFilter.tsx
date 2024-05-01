import { Button } from "./button";
import { useState } from "react";

enum Filters {
  HOT = "Hot",
  POPULAR = "Popular",
  NEW = "New",
}

type PostFilterProps = {
  posts: string[];
};

function PostFilter({ posts }: PostFilterProps) {
  const [selected, setSelected] = useState<Filters>(Filters.HOT);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4 rounded-full bg-moreInformation">
        <Button
          onClick={() => setSelected(Filters.HOT)}
          className={`${
            selected === Filters.HOT
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">
            local_fire_department
          </span>
          {Filters.HOT}
        </Button>
        <Button
          onClick={() => setSelected(Filters.POPULAR)}
          className={`${
            selected === Filters.POPULAR
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">data_thresholding</span>
          {Filters.POPULAR}
        </Button>
        <Button
          onClick={() => setSelected(Filters.NEW)}
          className={`${
            selected === Filters.NEW
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">breaking_news_alt_1</span>
          {Filters.NEW}
        </Button>
      </div>
      {selected === Filters.HOT && <div>HOT</div>}
      {selected === Filters.POPULAR && <div>POPULAR</div>}
      {selected === Filters.NEW && <div>NEW</div>}
    </div>
  );
}

export default PostFilter;
