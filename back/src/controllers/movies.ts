import { MoviesService } from './../services/movies';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Movies } from '../schemas/movies';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

      return response.json({
        message: 'success',
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get('top-rated')
  async topRated(@Res() response): Promise<object> {
    try {
      const data = await this.moviesService.topRated();

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
