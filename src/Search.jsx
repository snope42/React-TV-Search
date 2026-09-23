import {useState} from "react";
import Card from "./Card.jsx";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function Search() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState([]);

    async function lookup() {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
        const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`);

        if (!movieResponse.ok) {
            console.log(movieResponse.status + ' ' + movieResponse.statusText);
            return;
        }
        if (!tvResponse.ok) {
            console.log(tvResponse.status + ' ' + tvResponse.statusText);
            return;
        }

        const movieData = await movieResponse.json();
        const tvData = await tvResponse.json();

        const movies = movieData.results.map(movie => ({
           ...movie,
           type: 'movie'
        }));
        const tvSeries = tvData.results.map(serie => ({
            ...serie,
            type: 'tv'
        }));

        setShows([
            ...movies,
            ...tvSeries
        ]);
    }

    return (

        <div id={'main'} >
            <div id={'search'} className={'center'}>
                <div>
                    <input
                        value={search}
                        onChange={e => setSearch(e.currentTarget.value)}
                    />
                    <button id={'search-button'}
                            style={{marginLeft: '10px', marginBottom: '10px'}}
                            onClick={lookup}
                    >Search</button>
                </div>

                <div id={'movies'} className={'list'}>
                    {shows.map(show => (
                        <Card
                            key={show + show.id}
                            id={show.id}
                            type={show.type}
                            title={show.title || show.name}
                            image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            rating={show.vote_average.toFixed(1)}
                            release={String(show.release_date).slice(0, 4) || String(show.first_air_date).slice(0, 4)}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}