import Search from "./Search.jsx";
import ShowsCategory from "./ShowsCategory.js";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Home() {

    const navigate = useNavigate();
    const [categorySelected, setCategorySelected] = useState(ShowsCategory.ALL);

    return(

        <>
            <header>
                <button
                    onClick={() => setCategorySelected(ShowsCategory.ALL)}
                    style={{color: categorySelected === ShowsCategory.ALL ? 'wheat' : 'white'}}
                    className={'headerOptions'}>All</button>
                <button
                    onClick={() => setCategorySelected(ShowsCategory.MOVIE)}
                    style={{color: categorySelected === ShowsCategory.MOVIE ? 'wheat' : 'white'}}
                    className={'headerOptions'}>Movies</button>
                <button
                    onClick={() => setCategorySelected(ShowsCategory.TV)}
                    style={{color: categorySelected === ShowsCategory.TV ? 'wheat' : 'white'}}
                    className={'headerOptions'}>TV</button>
                <button id={'favorites'} onClick={() => navigate('/favorites')}>
                    Favorites
                </button>
            </header>
            <Search category={categorySelected}></Search>
        </>

    );

}