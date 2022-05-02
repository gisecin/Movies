import { useEffect, useState } from "react";
import { MovieCard } from './MovieCard';
import styles from './MoviesGrid.module.css'
import { get } from '../utils/httpClient'
import { Spinner } from "./Spinner";
import { useQuery } from "../hooks/useQuery";
import InfiniteScroll from "react-infinite-scroll-component";




export function MoviesGrid(){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

   

    const query = useQuery();
    const search = query.get("search");
   
    
    useEffect(() => {
        setIsLoading(true);
        const searchUrl = search
        ? "/search/movie?query=" + search + "&page=" + page
        : "/discover/movie?page" + page;
        get(searchUrl).then((data) => {
          setMovies((prevMovies) => prevMovies.concat(data.results));
          setIsLoading(false);
        });
      }, [search, page]);

     
    console.log(movies)
return (
    <InfiniteScroll dataLength={movies.length} hasMore={true} 
    next={() => setPage(prevPage => prevPage + 1)}
    loader={<Spinner />}
    >
        
    <ul className={styles.moviesGrid}>
    {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
    ))}
</ul>
</InfiniteScroll>
);
}