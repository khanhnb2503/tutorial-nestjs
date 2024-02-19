import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PostService {
  async create(
    body: CreatePostDto,
    files: { avatar: Express.Multer.File, images: Express.Multer.File[] }
  ) {
    console.log(body)
    console.log(files)
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(body.title, salt)
    const result = bcryptjs.compareSync(body.title, '$2a$10$Mv/AmxKiQsCqat9QJXf63eNv0/1.9NtUiKcyOhynsbMarzq30K0DO')
    console.log(hashPassword);
    console.log(result);
    return 'oke';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
