export interface SearchMoviesApiResponse{
    page: number;
    results: SearchMoviesList[];
    total_pages: number;
}

export interface SearchMoviesList{
    poster_path?: string;
    id: number;
    title: string;
    vote_average: number;
}

export interface SearchSeriesApiResponse{
    page: number;
    results: SearchSeriesList[];
    total_pages: number;
}

export interface SearchSeriesList{
    poster_path?: string;
    id: number;
    name: string;
    vote_average: number;
}