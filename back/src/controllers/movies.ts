import { MoviesService } from './../services/movies';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Movies } from '../schemas/movies';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { query, response } from 'express';

@Controller('/movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @InjectModel(Movies.name) private moviesModel: Model<Movies>,
  ) {}
  @Get()
  async findAll(@Res() response, @Query('page') page: string): Promise<object> {
    try {
      const data = await this.moviesService.findAll(page);
			console.log("TCL: MoviesController -> data", data)

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get('lists')
  async getLists(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.getLists();

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('now-playing')
  async nowPlayingList(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.nowPlayingList();
			console.log("TCL: MoviesController -> data", data)

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get('movie')
  async findMovieById(@Res() response, @Query() query): Promise<object> {
    try {
      const [id] = Object.keys(query);
      const data = await this.moviesService.findMovieById(id);

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get('upcoming')
  async upcoming(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.upcoming();
			console.log("TCL: MoviesController -> data", data)

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Post('saved')
  async getUserSavedMovies(
    @Res() response,
    @Body() saved: any,
  ): Promise<object> {
    try {
      console.log("TCL: MoviesController -> saved", saved)
      if (!saved) throw new Error('no saved items selected');
      const savedItems = [...saved];
      const allSavedMovies = await Promise.all(
        savedItems.map(async (movieId) => {
          const data = await this.moviesService.getUserSavedMovies(movieId);
          return data;
        }),
      );
      console.log("TCL: MoviesController -> allSavedMovies", allSavedMovies)
      return response.json({
        message: 'success',
        data: allSavedMovies,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Post('favorites')
  async getUserFavoriteMovies(
    @Res() response,
    @Body() favorites: any,
  ): Promise<object> {
    try {
      if (!favorites) throw new Error('no favorite items selected');;
      const favoriteItems = [...favorites];
      const allFavoriteMovies = await Promise.all(
        favoriteItems.map(async (movieId) => {
          const data = await this.moviesService.getUserFavoriteMovies(movieId);
          return data;
        }),
      );
      
      return response.json({
        message: 'success',
        data: allFavoriteMovies,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get('top-rated')
  async topRated(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.topRated();
			console.log("TCL: MoviesController -> data", data)

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/genres')
  async getGenres(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.getGenres();

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/popular')
  async getPopularMovies(
    @Query() allParams: any,
    @Res() response,
  ): Promise<object> {
    try {
      const data = await this.moviesService.getPopularMovies(allParams);

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
