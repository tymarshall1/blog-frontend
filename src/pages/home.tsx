import Post from "../components/ui/post";

function Home() {
  return (
    <div className="p-4 space-y-4">
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
  );
}

export default Home;
