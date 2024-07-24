import { timeSince } from "@/lib/utils";
import { useRef } from "react";
import { Link } from "react-router-dom";

type UserInfoProps = {
  username: string;
  profileImg: string;
  timeStamp: string;
  postOrComment?: string;
  postOrCommentOpened?: boolean;
};

function UserInfo(props: UserInfoProps) {
  const userRef = useRef<HTMLAnchorElement | null>(null);
  function toggleTextHighlightOnHover() {
    userRef.current ? userRef.current.classList.toggle("text-secondary") : "";
  }
  return (
    <div className="flex gap-2 pt-1">
      <Link to={`/user/${props.username}`}>
        <img
          className="w-10 h-10 rounded-full min-w-10 min-h-10 border-[1px] border-white/40"
          src={props.profileImg}
          alt="users icon"
          onMouseEnter={toggleTextHighlightOnHover}
          onMouseLeave={toggleTextHighlightOnHover}
        />
      </Link>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <Link
              onClick={(e) => e.stopPropagation()}
              ref={userRef}
              className="font-bold text-white hover:text-secondary"
              to={`/user/${props.username}`}
            >
              {props.username}
            </Link>
            <span className="ml-1 text-sm text-white/50">
              {timeSince(props.timeStamp)}
            </span>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${
            props.postOrCommentOpened ? "" : "max-h-8 opacity-50"
          } hover:cursor-text max-w-4xl select-text pr-4 overflow-hidden font-normal prose text-left text-white break-words break-all prose-pre:break-all md:prose-pre:break-words prose-blockquote:text-white prose-pre:whitespace-pre-wrap prose-h1:text-white prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-white`}
          dangerouslySetInnerHTML={{ __html: props.postOrComment || "" }}
        ></div>
      </div>
    </div>
  );
}

export default UserInfo;
