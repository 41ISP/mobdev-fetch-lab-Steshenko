import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './MovieDetailsPage.css';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';



const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetailsPage() {
  const {imdbID} = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      setError(null);
      setIsLoading(true);

      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch(err) {
        setError('Не удалось связь брат с серваком');
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadMovie();
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <div className="container">
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && movie && <MovieDetails movie={movie} />}
      </div>
    </main>
  );
}

export default MovieDetailsPage;
