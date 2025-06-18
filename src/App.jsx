
import React, { useState,useEffect } from 'react'
import Search from './Components/Search'

const App = () => {
 
 const [searchTerm, setsearchTerm] = useState('');
 
 const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
 
const BASE_URL="https://api.themoviedb.org/3"

const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
 
const fetchMovies= async () =>{


try{
const END_POIINT=`${BASE_URL}/discover/movie?sort_by=popularity.desc`
const response=await fetch(END_POIINT, API_OPTIONS);


console.log(response);

}
catch(error){
  console.error("Error fetching movies:", error);
}








}


useEffect(() => {
  fetchMovies();
}, []);
 
  return (
   <main>
    <div className='pattern'/>

    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="" />
 <h1>Find <span className=' text-gradient'>Movies</span> You will Love Without the hassle</h1>

      </header>
      <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>

     
    </div>
    
   </main>
  )
}

export default App
