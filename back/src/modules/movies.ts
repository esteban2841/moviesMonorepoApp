import { Global, Module } from '@nestjs/common';
import { MoviesService } from '../services/movies';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from 'src/schemas/movies';
import { MoviesController } from 'src/controllers/movies';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URI),
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    }),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
