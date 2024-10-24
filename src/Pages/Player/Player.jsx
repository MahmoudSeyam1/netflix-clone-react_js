import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTc5OWZhMDI4MWRjYzk4OGQwYmEyZDA0YzI2ZjBkZCIsIm5iZiI6MTcyOTY3NzU2NC4zNjczODIsInN1YiI6IjY3MThjN2NiOWZmNjgxZDllMGEzOTEzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SQDxEPm7rnz_p5fcY8A2dWkKxfqPNGr_NhFyXgUkVdY'
    }
  };
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='player'>
      <Link  to='/'><img src={back_arrow_icon} alt="" /></Link>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder={0} allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
