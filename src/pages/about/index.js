import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        {' '}
        {/* This div centers and confines content */}
        <h1 className="text-4xl font-bold my-6 mb-12">About Us</h1>
        <section>
          <h2 className="text-3xl font-bold mt-4 mb-4">Who I Am</h2>
          <p>
            I&apos;m Adrian Nelson, a driven Front-end Developer with extensive
            experience in software development within global technology
            organizations. I specialize in creating dynamic and responsive web
            applications using a variety of modern technologies including
            JavaScript, TypeScript, React, and Node.js.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            Quick Easy Recipes - The Project
          </h2>
          <p>
            Quick Easy Recipes is my personal project born out of a desire to
            combine my technical skills with my interest in simplifying meal
            preparation. The site is designed to provide users with fast,
            simple, and delicious recipes, showcasing my ability to integrate
            comprehensive tech solutions in everyday life. It features
            responsive design and intuitive navigation, ensuring a seamless user
            experience across all devices.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mt-4 mb-4">My Journey</h2>
          <p>
            My developer career began in 2015, evolving from a Junior Software
            Developer to a Software Development Engineer II at Warner Bros.
            Discovery. Throughout my career, I have successfully managed complex
            projects, delivered within tight deadlines, and drove continuous
            improvements across digital platforms.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            Professional Highlights
          </h2>
          <p>
            At Warner Bros. Discovery, I played a key role in developing
            features for Discovery platforms using React Hooks and TypeScript. I
            also led a strategic redesign of the Labs Dashboard, significantly
            enhancing product flexibility and user experience. My work has been
            pivotal in standardizing and improving code quality across multiple
            product codebases.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mt-4 mb-4">Let&apos;s Connect</h2>
          <p>
            I&apos;m always eager to collaborate on innovative projects or
            discuss potential opportunities. Feel free to connect with me on
            LinkedIn (https://www.linkedin.com/in/adrian-nelson) or drop me an
            email at adriannelson1989@gmail.com.
          </p>
        </section>
        <section>
          <h3 className="text-3xl font-bold mt-4 mb-2">Meet the Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="team-member mt-4">
              <img src="/adrian.jpg" alt="Team Member 1" className="w-full" />
              <h3 className="text-xl font-bold mt-2">Adrian Nelson</h3>
              <p>Founder</p>
            </div>
            <div className="team-member mt-4">
              <img src="/adrian_2.jpg" alt="Team Member 2" className="w-full" />
              <h3 className="text-xl font-bold mt-2">Adrian Nelson</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member mt-4">
              <img src="/adrian_3.jpg" alt="Team Member 3" className="w-full" />
              <h3 className="text-xl font-bold mt-2">Adrian Nelson</h3>
              <p>Lead Designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
