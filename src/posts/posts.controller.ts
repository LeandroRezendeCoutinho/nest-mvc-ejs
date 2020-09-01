import { Controller, Get, Render } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { get } from "http";
import { Post } from "./post.entity";

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  @Render('post/index')
  async root() {
    return { posts: await this.postsService.findAll() }
  }
}