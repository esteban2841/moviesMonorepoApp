export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
}

export interface SwiperHomeProps {
    sectionName: string;
    sectionData: Movie[]
}

export interface MovieHomeCardProps {
    backdrop_path: string; //img on case of error on main one
    id: number; // to query again when details view selected
    poster_path?: string; //principal image in card component
    release_date: string; //
    title: string; // title to show
    vote_average: number; //rating to show in cards home card slider
}
