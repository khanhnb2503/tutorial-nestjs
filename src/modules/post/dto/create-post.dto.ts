import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, Length } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    description: 'Tiêu đề bài viết',
    required: true
  })
  @Length(10, 20)
  @IsString()
  title: string

  @ApiProperty({
    description: 'Năm xuất bản',
    required: true
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Năm xuất bản phải là số!' })
  publishedYear: number

  @ApiProperty({
    description: 'Ảnh đại diện',
    type: 'string',
    format: 'binary',
    required: true
  })
  avatar: Express.Multer.File

  @ApiProperty({
    description: 'Ảnh đại diện',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true
  })
  images: Express.Multer.File[]
}
