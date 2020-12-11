import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    const movies: Movie[] = this.moviesService.getAll();
    return {
      message: '모든 영화 조회 성공.',
      data: {
        movies,
      },
    };
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number) {
    const movie: Movie = this.moviesService.getOne(movieId);
    return {
      message: '영화 조회 성공.',
      data: {
        movie,
      },
    };
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    this.moviesService.create(movieData);
    return {
      message: '영화 추가 성공.',
    };
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    this.moviesService.deleteOne(movieId);
    return {
      message: '영화 삭제 성공.',
    };
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    this.moviesService.update(movieId, updateData);
    return {
      message: '영화 수정 성공.',
    };
  }
}
