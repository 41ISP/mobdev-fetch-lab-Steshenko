import { useNavigate } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieDetails.css';


function MovieDetails({ movie }) {
  const navigate = useNavigate();

  const{
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Plot,
    Poster,
    Director,
    Writer,
    Actors,
    Released,
    Language,
    Country,
    Awards,
    BoxOffice,
    Ratings = [],
  } = movie;

  return (
    <article className="movie-details">
      <button type="button" className="movie-details__back"
      onClick={() => navigate(-1)}>
        ← Ко всем фильмам
      </button>

      <div className="movie-details__layout">
        <div className="movie-details__poster-col">
          {Poster && Poster !== 'N/A' ? (
          <img
            className="movie-details__poster"
            src={Poster}
            alt={Title}
          />
          ) : (
          <div className="movie-details__poster movie-details__poster--empty">
            Постера нету,украли
        </div>
          )}
      </div>

        <div className="movie-details__main">
          <div className="movie-details__heading">
            <div>
              <h1 className="movie-details__title">{Title}</h1>
              <p className="movie-details__meta">{Year} · {Rated} · {Runtime} </p>
            </div>
            <LikeButton />
          </div>

          <p className="movie-details__genre">{Genre}</p>

          <p className="movie-details__plot">{Plot}</p>

          <div className="movie-details__ratings">
            {Ratings.map((rating) => (
            <RatingBadge
            key={rating.Source}
            source={rating.Source}
            value={rating.Value}
            />
            ))}
            </div>
    
          <dl className="movie-details__facts">
            <div className="movie-details__fact"><dt>Режиссёр</dt><dd>{Director}</dd></div>
            <div className="movie-details__fact"><dt>Сценарий</dt><dd>{Writer}</dd></div>
            <div className="movie-details__fact"><dt>В ролях</dt><dd>{Actors}</dd></div>
            <div className="movie-details__fact"><dt>Дата выхода</dt><dd>{Released}</dd></div>
            <div className="movie-details__fact"><dt>Язык</dt><dd>{Language}</dd></div>
            <div className="movie-details__fact"><dt>Страна</dt><dd>{Country}</dd></div>
            <div className="movie-details__fact"><dt>Награды</dt><dd>{Awards}</dd></div>
            <div className="movie-details__fact"><dt>Сборы</dt><dd>{BoxOffice}</dd></div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export default MovieDetails;
