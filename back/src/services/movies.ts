import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movies } from '../schemas/movies';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

export interface MoviesResponse {
  page: number;
  results: Movie[];
}

interface Movie {
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

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<Movies>,
    private http: HttpService,
  ) {}

  async findAll(page?: string) {
    const pageToRequest = page || '1';
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>(
          `/discover/movie?language=en-US&page=${pageToRequest}`,
          {
            withCredentials: true,
            params: {
              api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async nowPlayingList() {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/movie/now_playing?language=en-US', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findMovieById(id: string) {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>(`/movie/${id}`, {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async topRated() {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/movie/top_rated?language=en-US', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async upcoming() {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/movie/upcoming?language=en-US', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getPopularMovies(params?: string) {
    // const paramsArray = params.split('?') || '';

    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/movie/popular', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getLists() {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/movie/533535/lists?language=en-US&page=1', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getGenres() {
    const { data } = await firstValueFrom(
      this.http
        .get<MoviesResponse>('/genre/movie/list?language=en', {
          withCredentials: true,
          params: {
            api_key: process.env.MOVIES_API_KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
