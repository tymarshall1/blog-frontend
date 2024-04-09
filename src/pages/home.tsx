import Post from "../components/ui/post";
import MoreInformation from "@/components/ui/moreInformation";
function Home() {
  return (
    <div className="flex justify-evenly">
      <div className="p-4 space-y-4 ">
        <Post
          community={"Community"}
          user={"User"}
          timeCreated={"4"}
          title={"Post Title"}
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor."
          }
          likes={4321}
          dislikes={213}
          comments={5432}
        />
        <Post
          community={"Community"}
          user={"User"}
          timeCreated={"4"}
          title={"Post Title"}
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor." +
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor."
          }
          likes={4321}
          dislikes={213}
          comments={5432}
        />
        <Post
          community={"Community"}
          user={"User"}
          timeCreated={"4"}
          title={"Post Title"}
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor." +
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor." +
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor." +
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor."
          }
          likes={4321}
          dislikes={213}
          comments={5432}
        />
        <Post
          community={"Community"}
          user={"User"}
          timeCreated={"4"}
          title={"Post Title"}
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Animi mollitia dignissimos quam autem porro officia, asperiores cumque dolore " +
            "earum molestiae ducimus temporibus, labore voluptatem quia veniam, voluptates maiores sed dolor."
          }
          likes={4321}
          dislikes={213}
          comments={5432}
        />
      </div>
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Home;
