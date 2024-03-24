import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

/**
 * @description
 * Pipe này sử dụng như 1 custom pipe \
 * Pipe này sẽ chạy sau class validator \
 * Tác dụng: Trasnform object ID từ string thành dạng Object ID của MongoDB
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    try {
      return new ObjectId(value);
    } catch (error) {
      throw new BadRequestException(`Invalid Object ID`);
    }
  }
}

/**
 * ``@description`` Pipe này sử dụng trong DTO kết hợp class validator \
 * ``Tác dụng``: Trasnform object ID hoặc IDs từ string hoặc string[] thành dạng Object ID của MongoDB
 */
export const ParseObjectId = function (params?: { key?: string }) {
  return Transform(({ value }) => {
    if (Array.isArray(value)) {
      //validate
      for (const el of value) {
        const validObjectId = Types.ObjectId.isValid(el);
        if (!validObjectId) {
          throw new BadRequestException(`Invalid Object ID at ${params.key}`);
        }
      }
      //transform
      return value.map((el) => {
        return Types.ObjectId.createFromHexString(el);
      });
    } else {
      const validObjectId = Types.ObjectId.isValid(value);
      if (!validObjectId) {
        throw new BadRequestException(` Invalid Object ID at ${params.key} `);
      }
      return Types.ObjectId.createFromHexString(value);
    }
  });
};
