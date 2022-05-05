export interface DiscoverMoviesApiResponse{
    page: number;
    total_pages: number;
    results: DiscoverMoviesList[];
}

export interface DiscoverMoviesList{
    poster_path: string;
    release_date: string;
    id: number;
    title: string;
    backdrop_path: string;
    vote_average: number;
}

export interface DiscoverSeriesApiResponse{    
    page: number;
    total_pages: number;
    results: DiscoverSeriesList[];
}

export interface DiscoverSeriesList{
    poster_path: string;
    first_air_date: string;
    id: number;
    name: string;
    backdrop_path: string;
    vote_average: number;
}
