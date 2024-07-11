import { MoreInformation } from "@/components/ui/moreInformation";
import PostFeed from "@/components/ui/postFeed";

function Home() {
  return (
    <div className="flex items-start justify-center">
      <PostFeed />
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Home;
