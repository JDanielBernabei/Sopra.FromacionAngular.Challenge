export interface DetailsMovieApiResponse{
    id: number;
    backdrop_path?: string;
    genres: genre[];
    overview?: string; 
    release_date: string;
    runtime: string;
    title: string;
    vote_average: number;
    production_countries: [string];
}

export interface DetailsSeriesApiResponse{
    id: number;
    backdrop_path?: string;
    genres: genre[];
    overview: string; 
    first_air_date: string;
    runtime: string;
    name: string;
    vote_average: number;
    production_countries: [string];
}

export interface genre{
    id: number;
    name: string;
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
