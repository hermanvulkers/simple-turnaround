import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, title: 'Hello Kubernetes', content: 'This is your first post!' },
  ];

  findAll() {
    return this.posts;
  }
}
