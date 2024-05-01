import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: "60px",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const HomePage = () => {
  return (
    // <div className="relative h-screen w-full">
    //   <Image 
    //     src="/spaghetti.png" 
    //     alt="Delicious Spaghetti"
    //     fill
    //     style={{ objectFit: 'cover', objectPosition: 'center' }}
    //   />
    //   <div className="absolute inset-0 flex items-center justify-center">
    //     <h1 className="text-6xl font-bold text-white max-w-2xl mx-auto px-4 my-8 text-center">Discover Delicious Dishes</h1>
    //   </div>
    // </div>
    <main className="relative">
      <div className="bg-hero-pattern bg-cover bg-center h-screen w-full flex items-center justify-center text-white" style={{ backgroundImage: 'url(/spaghetti.png)' }}>
        <h1 className="text-6xl font-bold text-white max-w-2xl mx-auto px-4 my-8 text-center">Discover Delicious Dishes</h1>
      </div>
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Top Recipes</h2>
        <Slider {...settings}>
          <div><img src="/spaghetti.png" alt="Recipe 1" /></div>
          <div><img src="/spaghetti.png" alt="Recipe 2" /></div>
          <div><img src="/spaghetti.png" alt="Recipe 3" /></div>
          <div><img src="/spaghetti.png" alt="Recipe 3" /></div>
          <div><img src="/spaghetti.png" alt="Recipe 3" /></div>
          <div><img src="/spaghetti.png" alt="Recipe 3" /></div>
          {/* More slides as needed */}
        </Slider>
      </section>
    </main>
  );
};

export default HomePage;
