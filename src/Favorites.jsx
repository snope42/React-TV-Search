import Card from "./Card.jsx";

export default function Favorites() {

    let favorites = Array.from(JSON.parse(localStorage.getItem('favorites'))?? []);

    if (!favorites) {
        return <div className={'center'}>No show has been saved yet</div>;
    }



    return (

        <>
            <div id={'favoriteMovies'} className={'list'}>
                {(
                        (favorites.map(show => (
                            <Card
                                key={'show-' + show.id}
                                id={show.id}
                                type={show.type}
                                title={show.title}
                                image={`https://image.tmdb.org/t/p/w500${show.image}`}
                                rating={show.rating}
                                release={show.release}
                            />
                        )))
                )}
            </div>
        </>

    );

}