export interface DetailsMovieApiResponse{
    poster_path?: string;
    id: number;
    backdrop_path?: string;
    genres: genre[];
    overview?: string; 
    release_date: string;
    runtime: string;
    title: string;
    vote_average: number;
    production_countries: production_countries[];
}

export interface DetailsSeriesApiResponse{
    poster_path?: string;
    id: number;
    backdrop_path?: string;
    genres: genre[];
    overview: string; 
    first_air_date: string;
    episode_run_time: number[];    
    name: string;
    vote_average: number;
    production_countries: production_countries[];
}

export interface genre{
    id: number;
    name: string;
}

export interface production_countries{
    iso_3166_1: string
}

export interface CreditsApiResponse{
    id: number;
    cast: cast[];
}

export interface cast{
    known_for_department: string;
    name: string;
    character: string;
}
