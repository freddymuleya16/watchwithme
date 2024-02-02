// pages/movie/[imdbId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/loading';
import Image from 'next/image';

const MovieDetailsPage = () => {
    const router = useRouter();
    const { imdbId } = router.query;
    const [movieDetails, setMovieDetails] = useState(null);


    const getMovieDetails = async (imdbId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/${imdbId}`);
        const data = await response.json();
        return data;
    };


    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (imdbId) {
                try {
                    const data = await getMovieDetails(imdbId);
                    setMovieDetails(data);
                } catch (error) {
                    console.error('Error fetching movie details:', error);
                }
            }
        };

        fetchMovieDetails();
    }, [imdbId]);

    if (!movieDetails) {
        return (
            <div className="bg-gray-200 ">
                <div className="bg-white min-h-screen">
                    <Loading />
                </div>
            </div>
        );
    }
 

    return (
        <div className="bg-gray-200 min-h-screen">
        <div className="bg-white min-h-screen">
          <header className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="hidden w-full text-gray-600 md:flex md:items-center">
                <i className="fas fa-video h-5 w-5"></i>
              </div>
              <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
                Watch With Me
              </div>
              <div className="flex items-center justify-end w-full"></div>
            </div>
          </header>
          <main className="my-8">
            <div className="container mx-auto px-6">
              <div className="mt-16">
                <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                  <div className="flex items-end justify-end h-56 w-full bg-cover relative">
                    {movieDetails.Poster && (
                      <Image
                        src={movieDetails.Poster}
                        alt={movieDetails.Title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    )}
                  </div>
                  <div className="px-5 py-3">
                    <h3 className="text-gray-700 uppercase text-2xl font-bold mb-2">
                      {movieDetails.Title}
                    </h3>
                    <p className="text-gray-600">{movieDetails.Plot}</p>
                    <p className="text-gray-600 mt-2">
                      IMDB Score: {movieDetails.imdbRating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
};

export default MovieDetailsPage;
