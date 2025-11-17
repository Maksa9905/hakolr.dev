import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { QueryPostsDto } from '../dto/query-posts.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  private validateUUID(id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() query: QueryPostsDto) {
    return this.postService.findAllPaginated(query);
  }

  @Get('stats')
  getPostsStats() {
    return this.postService.getPostsStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.validateUUID(id);
    await this.postService.incrementViews(id);
    return this.postService.findOne(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    this.validateUUID(id);
    return this.postService.incrementLikes(id);
  }

  @Delete(':id/like')
  unlike(@Param('id') id: string) {
    this.validateUUID(id);
    return this.postService.decrementLikes(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    this.validateUUID(id);
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    this.validateUUID(id);
    return this.postService.remove(id);
  }
}
