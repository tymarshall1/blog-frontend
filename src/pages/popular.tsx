import { MoreInformation } from "@/components/ui/moreInformation";
import PostFeed from "@/components/ui/postFeed";

function Popular() {
  return (
    <div className="items-start justify-center lg:flex">
      <PostFeed filter="popular" />
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Popular;
