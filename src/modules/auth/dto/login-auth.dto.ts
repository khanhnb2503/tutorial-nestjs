import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
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
