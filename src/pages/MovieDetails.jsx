import { useParams } from 'react-router';
import styles from './MovieDetails.module.css'
import { useEffect, useState } from 'react';
import { get } from '../utils/httpClient'
import { Spinner } from '../components/Spinner';


export function MovieDetails (){
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie]  = useState(null);

   
   
    useEffect(() => {
        setIsLoading(true)
       get("/movie/" + movieId).then((data) => {
           setIsLoading(false);
           setMovie(data);
       });
        
    }, [movieId])

    if(isLoading){
        return <Spinner />;
    }

   
    const imageUrl = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
    return <div className={styles.detailsContainer}>
        <img className={styles.col + " " + styles.movieImage} src={imageUrl} alt={movie.title} />
        <div className={styles.col + " " + styles.movieDetails}>
            <p className={styles.firsItem}><strong>Title:</strong> {movie.title}</p>
            <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map(genre => genre.name).join(", ")}
            </p>
            <p><strong>Description:</strong> {movie.overview}</p>
        </div>
    </div>
    
}