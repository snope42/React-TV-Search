import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

export default function Card(props) {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    let favorites = Array.from(JSON.parse(localStorage.getItem('favorites'))?? []);

    useEffect(() => {
        for (let show of favorites) {
            if (show.id === props.id) {
                setFavorite(true);
                break;
            }
        }
    }, [props.id]);

    function toggleFavorite(e) {
        e.stopPropagation();

        if (favorite) {
            favorites = favorites.filter(show => show.id !== props.id);
            setFavorite(false);
        } else {
            favorites.push(
                {
                    id: props.id,
                    type: props.type,
                    title: props.title,
                    image: props.image,
                    rating: props.rating,
                    release: props.release
                }
            );
            setFavorite(true);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }

    return(

        <div
            style={{
                width: '130px',
                height: '180px',
                marginRight: '20px',
                display: 'flex', flexDirection: 'column'
            }}  className={'pointer'}

            onClick={() => navigate(`/${props.type}/${props.id}`)}
        >
            <img src={props.image} alt={''} style={{width: '100%', height: '100px', backgroundColor: 'black'}} />
            <label style={{fontSize: '0.5em'}}>{props.type}</label>
            <label className={'ellipsis'} style={{fontSize: '0.9em', fontWeight: 'bold'}}>{props.title}</label>
            <label style={{fontSize: '0.7em'}}>{props.release}</label>
            <label style={{fontSize: '0.6em'}}>{props.rating}</label>
            <button id='favorite' onClick={toggleFavorite}>{favorite ? '★' : '☆'}</button>
        </div>

    );
}
