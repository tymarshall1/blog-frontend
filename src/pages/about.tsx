import wave from "../assets/wavy.svg";

const images = Array(7).fill(wave);

function About() {
  return (
    <div className="p-4 mt-4 xl:grid xl:grid-cols-5 xl:justify-items-center">
      <div className="xl:col-start-1 xl:col-end-2">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="mt-[-.5rem] hidden w-48 rotate-90 xl:block"
            alt=""
          />
        ))}
      </div>

      <div className="flex flex-col max-w-xl gap-8 mx-auto xl:col-start-2 xl:col-end-5">
        <section className="p-4 space-y-4 text-center rounded shadow shadow-primary bg-primary text-secondary">
          <h1 className="text-4xl font-black ">About Me</h1>
          <p>Welcome to [Blog Name]! Here's a little bit about me:</p>
        </section>

        <section className="p-4 space-y-4 border-2 border-black rounded shadow-xl shadow-primary">
          <h2 className="text-2xl font-black text-center">Who Am I?</h2>
          <p>
            Hi, I'm [Your Name], the creator and author behind this blog. I'm
            passionate about [insert your passions here - e.g., writing,
            photography, cooking, etc.], and I created this space to share my
            thoughts, experiences, and insights with you.
          </p>
        </section>

        <section className="p-4 space-y-4 border-2 border-black rounded shadow-xl shadow-primary">
          <h2 className="text-2xl font-black text-center">
            What is [Blog Name] About?
          </h2>
          <p>
            [Blog Name] is a platform where I express my thoughts, share my
            experiences, and provide valuable insights on topics such as [insert
            topics relevant to your blog - e.g., travel, technology, lifestyle,
            etc.]. Whether it's sharing travel adventures, discussing the latest
            trends in technology, or exploring new recipes, I aim to inspire and
            inform my readers through engaging content.
          </p>
        </section>

        <section className="p-4 space-y-4 border-2 border-black rounded shadow-xl shadow-primary">
          <h2 className="text-2xl font-black text-center">
            Why I Started Blogging
          </h2>
          <p>
            I started blogging as a way to connect with like-minded individuals
            and to share my knowledge and experiences with a wider audience.
            Through blogging, I've found a creative outlet to express myself and
            share my passions with others. I believe that everyone has a unique
            story to tell, and I'm excited to share mine with you.
          </p>
        </section>

        <section className="p-4 space-y-4 border-2 border-black rounded shadow-xl shadow-primary">
          <h2 className="text-2xl font-black text-center">
            What You'll Find Here
          </h2>
          <h3 className="font-medium text-center text-md">
            On [Blog Name], you'll find a variety of content, including:
          </h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <span className="font-black">Personal Stories:</span>
              I'll share personal anecdotes, experiences, and reflections on
              various aspects of life.
            </li>
            <li>
              <span className="font-black">Helpful Tips and Advice:</span>
              Whether it's travel tips, tech hacks, or lifestyle advice, I'll
              provide practical tips and insights to help you navigate life's
              challenges.
            </li>
            <li>
              <span className="font-black">Inspiration and Motivation:</span>
              I'll share inspiring stories, quotes, and ideas to uplift and
              motivate you on your journey.
            </li>
          </ul>
        </section>

        <section className="p-4 space-y-4 border-2 border-black rounded shadow-xl shadow-primary">
          <h2 className="text-2xl font-black text-center">Connect With Me</h2>
          <p className="mb-2">
            I love connecting with my readers! Feel free to reach out to me via
            email at [Your Email Address] or connect with me on social media
            [Insert Social Media Links].
          </p>
          <p>
            Thank you for visiting [Blog Name]! I hope you enjoy exploring the
            content and find it both informative and inspiring.
          </p>
        </section>
      </div>
      <div className="xl:col-start-5 xl:col-end-6">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="hidden w-48 rotate-[270deg] xl:block mt-[-.5rem]"
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

export default About;
