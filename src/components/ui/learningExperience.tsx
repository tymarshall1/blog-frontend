function LearningExperience() {
  return (
    <div
      style={{
        backgroundImage: `url('${"https://res.cloudinary.com/de7we6c9g/image/upload/v1719450600/Community%20Backgrounds/defaultSpace1.jpg"}')`,
      }}
      className="flex flex-col items-center justify-center gap-4 p-2 text-center text-white bg-no-repeat bg-cover border-2 rounded text-shadow min-h-48 bg-sideNav border-white/20"
    >
      <h1 className="text-4xl font-bold underline">
        Learning <span className="text-secondary">Experience</span>
      </h1>
      <p className="text-lg font-bold tracking-wide">
        As this website just for the
        <span className="text-secondary"> learning</span> experience, this page
        does not contain any information.
      </p>
    </div>
  );
}

export default LearningExperience;
