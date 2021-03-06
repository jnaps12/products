import { HttpException, HttpStatus } from '@nestjs/common';
export class NotFoundException extends HttpException {
  constructor(entity: string, id: number) {
    super(`This ${entity} was not found - id #${id}.`, HttpStatus.NOT_FOUND);
  }
}
