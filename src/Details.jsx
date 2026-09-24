import {useParams} from "react-router";
import {useEffect, useState} from "react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function Details() {
    const { type, id } = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        async function lookup() {
            const response = await fetch(
                `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
            );

            if (!response.ok) {
                return <div className={'center'}>{response.status + " " + response.statusText}</div>;
            }

            return await response.json();
        }

        lookup().then(data => setShow(data));
    }, [type, id]);

    if (!show) {
        return <div className={'center'}>Loading...</div>;
    }

    return (

        <>
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                 alt={''}
                 style={{width: "100px", height: "150px"}}
            />
            <p style={{marginBottom: '7px', marginTop: '7px'}}>Title: {show.title || show.name}</p>
            <p style={{marginBottom: '7px', marginTop: '7px'}}>Type: {type}</p>
            <p
                style={{marginBottom: '7px', marginTop: '7px', width: '700px'}}
                className={'paragraph'}
            >
                Description: {show.overview}</p>
            <p style={{marginBottom: '7px', marginTop: '7px'}}>Rating: {show.vote_average?.toFixed(1)}</p>
            <p style={{marginBottom: '7px', marginTop: '7px'}}>
                Release: {show.release_date || show.first_air_date
                ? show.release_date || show.first_air_date
                : 'N/A'}
            </p>
        </>

    );
}