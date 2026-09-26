import {useEffect, useState} from "react";
import Card from "./Card.jsx";
import ShowsCategory from "./ShowsCategory.js";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function Search(props) {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);

    async function lookup() {
        setLoading(true);
        const results = [];

        if (
            props.category === ShowsCategory.MOVIE ||
            props.category === ShowsCategory.ALL
        ) {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);

            if (!movieResponse.ok) {
                setLoading(false);
                return <div className={'center'}>{movieResponse.status + ' ' + movieResponse.statusText}</div>;
            }
            const movieData = await movieResponse.json();

            const movies = movieData.results.map(movie => ({
                ...movie,
                type: 'movie'
            }));

            results.push(...movies);
        }
        if (
            props.category === ShowsCategory.TV ||
            props.category === ShowsCategory.ALL
        ) {
            const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`);

            if (!tvResponse.ok) {
                setLoading(false);
                return <div className={'center'}>{tvResponse.status + ' ' + tvResponse.statusText}</div>;
            }
            const tvData = await tvResponse.json();

            const tvSeries = tvData.results.map(serie => ({
                ...serie,
                type: 'tv'
            }));

            results.push(...tvSeries);
        }

        if (results.length === 0) setShows(null);
        else {
            results.sort((a, b) => b.popularity - a.popularity);
            setShows(results);
        }

        setLoading(false);

    }

    useEffect(() => {
        if (search) {
            lookup();
        }
    }, [props.category]);

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