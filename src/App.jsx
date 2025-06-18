
import React, { useState, useEffect } from 'react'
import Search from './Components/Search'
import Spinner from './Components/Spinner';
import MovieComponent from './Components/MovieComponent';

const App = () => {

  const [searchTerm, setsearchTerm] = useState('');

  const [allMovies, setallMovies] = useState([]);

  const [errorMessage, seterrorMessage] = useState(null);

  const [isLoading, setisLoading] = useState(false);



  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const BASE_URL = "https://api.themoviedb.org/3"

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async () => {
    setisLoading(true)

    try {
      const END_POINT = `${BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(END_POINT, API_OPTIONS);


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













    }
    catch (error) {
      console.error("Error fetching movies:", error);
    }

    finally {
      setisLoading(false)
    }







  }


  useEffect(() => {
    fetchMovies();
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
                    <MovieComponent id={movie.id} movie={movie}/>
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
