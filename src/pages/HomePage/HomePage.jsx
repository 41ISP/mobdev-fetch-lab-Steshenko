import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') {
    setError(data.Error);
    setMovies([]);
    }else {
    setMovies(data.Search);
    }
  } catch (err) {
    setError('нет связи брат с сервачком');
    setMovies ([]);
    }finally {
    setIsLoading(false);
  }
  }

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSearch}
         />
        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>

          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} />}
        </section>
      </div>
    </main>
  );
}

export default HomePage;