import React from 'react';
import Head from 'next/head';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { Recipe } from '@/types';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    <>
      <Head>
        <title>Discover Delicious Dishes</title>
        <meta
          name="description"
          content="Discover delicious dishes from our top recipes."
        />
      </Head>
      <main className="relative">
        <div className="bg-white w-full flex justify-center main-image-section relative">
          <div className="relative h-screen w-[1000px] flex items-center justify-center text-white text-shadow">
            <Image
              src="/chili_con_carne.png"
              alt="A Chili Con Carne dish"
              layout="fill"
              objectFit="cover"
              priority
            />
            <h1 className="absolute text-6xl font-bold text-white max-w-2xl mx-auto px-4 my-8 text-center">
              Discover Delicious Dishes
            </h1>
          </div>
        </div>
        <section className="container mx-auto px-4 py-8 top-recipes-section">
          <h2 className="text-2xl font-bold mb-6">Top Recipes</h2>
          <Slider {...settings}>
            {recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <Link href={`/recipes/${recipe.id}`}>
                  <div className="relative w-full h-0 pb-[100%]">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
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
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/recipes`);
  const recipes: Recipe[] = await res.json();

  return {
    props: {
      recipes,
    },
  };
}

export default HomePage;
