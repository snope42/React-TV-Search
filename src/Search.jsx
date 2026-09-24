import {useState} from "react";
import Card from "./Card.jsx";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function Search() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);

    async function lookup() {
        setLoading(true);

        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
        const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`);

        if (!movieResponse.ok) {
            setLoading(false);
            return <div className={'center'}>{movieResponse.status + ' ' + movieResponse.statusText}</div>;
        }
        if (!tvResponse.ok) {
            setLoading(false);
            return <div className={'center'}>{tvResponse.status + ' ' + tvResponse.statusText}</div>;
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

        const results = [
            ...movies,
            ...tvSeries
        ];

        if (results.length === 0) setShows(null);
        else setShows(results);

        setLoading(false);

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
                    {loading ?
                        (<div className={'center'}>Loading...</div>) :
                        ((shows ?
                            (shows.map(show => (
                                <Card
                                    key={'show-' + show.id}
                                    id={show.id}
                                    type={show.type}
                                    title={show.title || show.name}
                                    image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    rating={show.vote_average?.toFixed(1) || 'N/A'}
                                    release={
                                        show.release_date || show.first_air_date
                                            ? String(show.release_date || show.first_air_date).slice(0, 4)
                                            : 'N/A'
                                    }
                                />
                            ))) :
                            (<div className={'center'}>No results</div>)
                        ))
                    }
                </div>

            </div>
        </div>

    );
}