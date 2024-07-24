import { MoreInformation } from "@/components/ui/moreInformation";
import PostFeed from "@/components/ui/postFeed";

function Home() {
  return (
    <div className="items-start justify-center lg:flex">
      <PostFeed />
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Home;
