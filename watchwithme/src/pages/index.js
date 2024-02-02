import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading";
import Link from "next/link";
 

export default function Home() {
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
 
  const searchMovie = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/search?title=${title}`);
      const data = response.data;
      setSearchResults([...data.Search]);
    } catch (error) {
      console.error('Error searching movies:', error);
      // Handle error, show user a message, etc.
    } finally {
      setIsLoading(false);
    }
  };

  const researchMovie = async (name) => {
    try {
      setIsLoading(true);
      setTitle(name)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/search?title=${name}`);
      const data = response.data;
      setSearchResults([...data.Search]);
    } catch (error) {
      console.error('Error researching movies:', error); 
    } finally {
      setIsLoading(false);
    }
  };

  
 

 
  
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/history`);
        const data = response.data;
        setSearchHistory(data);
      } catch (error) {
        console.error('Error fetching search history:', error); 
      }
    };
  
    getHistory();
  }, [searchResults]);
   
  return (
    <>
    {isLoading && <Loading/>}
      <div className="bg-gray-200 ">
        <div className="bg-white min-h-screen">
          <header>
            <div className="container mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="hidden w-full text-gray-600 md:flex md:items-center">
                  <i className="fas fa-video h-5 w-5"></i>

                </div>
                <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
                  Watch With Me
                </div>
                <div className="flex items-center justify-end w-full">

                </div>
              </div>

              <div className="relative mt-20 max-w-lg mx-auto">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>

                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-red-400 text-gray-800 focus:outline-none focus:shadow-outline" type="text" placeholder="Search" />
                <button onClick={searchMovie} className="absolute inset-y-0 right-0 p-3 flex items-center bg-red-400 rounded-e-md">Search</button>
              </div>
              <div className="w-full mt-4 text-center">
                {searchHistory && searchHistory.map((search) =>
                  <span key={search.id} onClick={()=>researchMovie(search.query)} className="text-red-400 mr-3 cursor-pointer hover:font-bold" >{search.query}</span>
                )}

              </div>
            </div>
          </header>

          <main className="my-8">
            <div className="container mx-auto px-6"><div className="mt-16" >
              <h3 className="text-gray-600 text-2xl font-medium">Movies</h3>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6" >

                {searchResults && searchResults.map((movie) => (
                  <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden" key={movie.imdbID}>
                    <div className="flex items-end justify-end h-56 w-full bg-cover " style={{ backgroundImage: "url('" + movie.Poster + "')" }} >
                      <Link href={`/movie/${movie.imdbID}`} className="p-2 rounded-full bg-red-400 text-white mx-5 -mb-4 hover:bg-red-300 focus:outline-none focus:bg-blue-500">
                        <i className="fas fa-external-link-square-alt h-5 w-5"></i>
                      </Link>
                    </div>
                    <div className="px-5 py-3">
                      <h3 className="text-gray-700 uppercase">{movie.Title}</h3>
                      <span className="text-gray-500 mt-2">{movie.Year}</span>
                    </div>
                  </div>

                ))}

              </div>
            </div>

            </div>
          </main>

           
        </div >
      </div >
    </>
  );
}
