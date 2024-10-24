/* eslint-disable react/prop-types */
import './TitleCards.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTc5OWZhMDI4MWRjYzk4OGQwYmEyZDA0YzI2ZjBkZCIsIm5iZiI6MTcyOTY3NzU2NC4zNjczODIsInN1YiI6IjY3MThjN2NiOWZmNjgxZDllMGEzOTEzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SQDxEPm7rnz_p5fcY8A2dWkKxfqPNGr_NhFyXgUkVdY'
    }
  };

  const handelWheel = (event) => {
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener("wheel",  handelWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ ])

  return (
    <div className='titlecards'>
      <h2> {title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
              return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={ `https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
              </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
