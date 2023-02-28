import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>

  ){}

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.save(createCommentDto);
  }

  async findAll() {
    const commentList = await this.commentRepository.createQueryBuilder('comment')
    .orderBy('comment.createdAt', 'DESC')
    .getMany();

    return commentList
  }

  async findOne(id: number) {
    return await this.commentRepository.findOneBy({ id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(`comment #${id} not found`);
    }

    const commentUpdate = { ...comment, ...updateCommentDto };

    await this.commentRepository.save(commentUpdate);

    return commentUpdate;
  }

  async remove(id: number) {
    return await this.commentRepository.softDelete(id);
  }
}
