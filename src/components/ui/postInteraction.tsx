function PostInteraction({
  likes,
  dislikes,
  comments,
}: {
  likes: number;
  dislikes: number;
  comments: number;
}) {
  return (
    <div className="flex flex-wrap justify-between mt-4">
      <div className="flex text-sm font-light">
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("like button click");
          }}
          className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
        >
          <span className="material-symbols-outlined">thumb_up</span>
          <span>{likes}</span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("dislike button click");
          }}
          className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
        >
          <span className="material-symbols-outlined">thumb_down</span>
          <span>{dislikes}</span>
        </div>
      </div>
      <div className="flex gap-2 text-sm font-light tracking-wide">
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
          <span className="material-symbols-outlined">forum</span>
          <span>{comments} Comments</span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
          <span className="material-symbols-outlined">share</span>
          <span>Share</span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
          <span className="material-symbols-outlined">bookmark</span>
          <span>Save</span>
        </div>
      </div>
    </div>
  );
}

export default PostInteraction;
