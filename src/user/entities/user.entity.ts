import { CommentEntity } from "src/comment/entities/comment.entity";
import { Timestamp } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entity/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
