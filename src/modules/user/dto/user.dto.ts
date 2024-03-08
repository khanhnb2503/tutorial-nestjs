import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { BaseQuery } from "src/base/base.query";
import { IUser } from "src/interfaces";

export class CreateUserDto implements IUser {
  @ApiProperty({
    description: 'Nhập tên',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    description: 'Nhập địa chỉ email',
    required: true
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string

  @ApiProperty({
    description: 'Nhập mật khẩu',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  password: string
}

export class QueryUserDto extends BaseQuery {

}