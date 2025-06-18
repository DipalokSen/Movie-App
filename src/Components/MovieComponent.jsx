import React from 'react'

const MovieComponent = ({movie}) => {
  return (
    <div className='movie-card'>
 
   
        <img src={movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:'/no-movie.png'} alt="" />
        
        <div className='mt-4'>

          <p className='text-white'>{movie.title}</p>
       
       <div className='content'>


<div className="rating">
            <img src="/star.svg" alt="" />

            <p>{movie.vote_average?movie.vote_average.toFixed(1):N/A} </p>
          </div>

          <span>.</span>

          <p className="lang">{movie.original_language}</p>
          <span>.</span>

          <p className='year'>
          {movie.release_date?movie.release_date.split('-')[0]:N/A}
          </p>



</div>



        </div>
        

      
      



    </div>
  )
}

export default MovieComponent
