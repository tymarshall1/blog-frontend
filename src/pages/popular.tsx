import { MoreInformation } from "@/components/ui/moreInformation";
import PostFeed from "@/components/ui/postFeed";

function Popular() {
  return (
    <div className="flex items-start justify-center">
      <PostFeed filter="popular" />
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Popular;
