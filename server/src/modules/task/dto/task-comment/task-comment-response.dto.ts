import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TaskCommentResponseDto {
  @Expose() id!: string;
  @Expose() content!: string;
  @Expose() authorId!: string;
  @Expose() authorName!: string;
  @Expose() parentCommentId?: string;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
  @Expose() replies?: TaskCommentResponseDto[];
}
