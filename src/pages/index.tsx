import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/spaghetti.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Delicious Spaghetti"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
  <h1 className="text-6xl font-bold text-white max-w-2xl mx-auto px-4 my-8 text-center">Discover Delicious Dishes</h1>
</div>
    </div>
  );
};

export default HomePage;
