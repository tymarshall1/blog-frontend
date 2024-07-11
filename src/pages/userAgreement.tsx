import LearningExperience from "@/components/ui/learningExperience";
import { MoreInformation } from "@/components/ui/moreInformation";
function UserAgreement() {
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

export default UserAgreement;
