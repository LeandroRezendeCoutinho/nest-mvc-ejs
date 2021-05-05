import { Controller, Get, Render, Param, ParseIntPipe } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  @Render('post/index.ejs')
  async root() {
    return { posts: await this.postsService.findAll() }
  }

  @Get('/:id')
  @Render('post/show')
  async show(@Param('id', ParseIntPipe) id: number) {
    return { post: await this.postsService.findOne(id) }
  }
}