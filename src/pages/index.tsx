import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { Recipe } from '@/types';

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

interface HomePageProps {
  recipes: Recipe[];
}

const HomePage = ({ recipes }: HomePageProps) => {
  return (
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
          {recipes.map((recipe) => (
            <div key={recipe.id} className="relative">
              <Link href={`/recipes/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.name} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold text-shadow text-center">
                    {recipe.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </section>
    </main>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/recipes');
  const recipes: Recipe[] = await res.json();

  return {
    props: {
      recipes,
    },
  };
}

export default HomePage;
