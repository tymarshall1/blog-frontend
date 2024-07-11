import LearningExperience from "@/components/ui/learningExperience";
import { MoreInformation } from "@/components/ui/moreInformation";
function PrivacyPolicy() {
  return (
    <div className="flex gap-2 p-2 ">
      <div className="flex-1">
        <LearningExperience />
      </div>

      <MoreInformation className="m-0" defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default PrivacyPolicy;
