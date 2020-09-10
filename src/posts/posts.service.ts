import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) { }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find()
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne(id)
  }
}