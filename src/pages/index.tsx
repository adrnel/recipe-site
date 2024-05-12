import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: '60px',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
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
      <div
        className="bg-hero-pattern bg-cover bg-center h-screen w-full flex items-center justify-center text-white text-shadow"
        style={{ backgroundImage: 'url(/chili_con_carne.png)' }}
      >
        <h1 className="text-6xl font-bold text-white max-w-2xl mx-auto px-4 my-8 text-center">
          Discover Delicious Dishes
        </h1>
      </div>
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Top Recipes</h2>
        <Slider {...settings}>
          <div className="relative">
            <Link href="/recipes/1">
              <img src="/tikka_masala.png" alt="Tika Masala" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Tika Masala
                </p>
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link href="/recipes/2">
              <img src="/shepards_pie.png" alt="Shepards Pie" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Shepards Pie
                </p>
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link href="/recipes/3">
              <img src="/beef_stroganoff.png" alt="Beef Stroganoff" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Beef Stroganoff
                </p>
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link href="/recipes/3">
              <img src="/chili_con_carne.png" alt="Chili Con Carne" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Chili Con Carne
                </p>
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link href="/recipes/5">
              <img src="/spaghetti_bolognese.png" alt="Spaghetti Bolognese" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Spaghetti Bolognase
                </p>
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link href="/recipes/5">
              <img src="/chicken_parmesan.png" alt="Chicken Parmesan" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-bold text-shadow">
                  Chicken Parmesan
                </p>
              </div>
            </Link>
          </div>
        </Slider>
      </section>
    </main>
  );
};

export default HomePage;
