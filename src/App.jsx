
import React, { useState, useEffect } from 'react'
import Search from './Components/Search'
import Spinner from './Components/Spinner';
import MovieComponent from './Components/MovieComponent';
import { useDebounce } from 'react-use';
import { updatesearchTerm } from '../appWrite';
import { trendingMoviesdb } from '../appWrite';

const App = () => {

  const [searchTerm, setsearchTerm] = useState('');

  const [allMovies, setallMovies] = useState([]);

  const [errorMessage, seterrorMessage] = useState(null);

  const [isLoading, setisLoading] = useState(false);
 const [trendingMovies, settrendingMovies] = useState([]);
 
const [debouncedValue, setDebouncedValue] = useState('');

useDebounce(() => {
  setDebouncedValue(searchTerm);
}, 500, [searchTerm]);
  




  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const BASE_URL = "https://api.themoviedb.org/3"

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
const fetchTrendingMovies=async ()=>{

 const movies=await trendingMoviesdb()
 console.log(movies);
 settrendingMovies(movies)


}
  const fetchMovies = async (query= "") => {
    setisLoading(true)

    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);


      if (!response.ok) {
        throw new Error("Failed to Fetch Movies")
      }

      const data = await response.json()

      console.log(data);
      

      if (data.response == false) {
        seterrorMessage(data.error)
        setallMovies([])

        return
      }

      setallMovies(data.results || [])

      if(query && data.results.length >0){
        await updatesearchTerm(query,data.results[0])
      }

      













    }
    catch (error) {
      console.error("Error fetching movies:", error);
    }

    finally {
      setisLoading(false)
    }







  }


  useEffect(() => {
    fetchMovies(searchTerm);

  }, [debouncedValue]);


  useEffect(() => {
    fetchTrendingMovies()
  }, []);
  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>Find <span className=' text-gradient'>Movies</span> You will Love Without the hassle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>
<section className="trending">
  <h1>Trending Movies</h1>
  <ul>
     { trendingMovies.map((movie,index)=>(
        
        <li key={movie.$id}>
         <p>{index+1}</p>
          <img src={movie.poster_url} alt=""/>
          
        
        </li>
      ))
    }
  </ul>
</section>
        <section className='all-movies'>
          <h4 className='text-white'>Find All Movies</h4>

          {
            isLoading ? (
              <Spinner/>
            ) : errorMessage ? (
              <p className='text-white'>Internal Server Error</p>
            ) : (


              <ul>

                {

                  allMovies.map((movie) => (
                    <MovieComponent key={movie.id} movie={movie}/>
                  ))}





              </ul>




            )
          }
        </section>


      </div>

    </main>
  )
}

export default App
