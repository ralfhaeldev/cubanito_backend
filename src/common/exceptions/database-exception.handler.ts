// src/common/exceptions/database-exception.handler.ts

import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('DatabaseExceptionHandler');

export function handleDBExceptions(error: any): never {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error.code === '23505') {
    throw new BadRequestException(error.detail); // Duplicado
  }

  if (error.code === '23503') {
    // foreign key violation
    throw new BadRequestException('Invalid relation reference');
  }

  if (error.code === '22P02') {
    // invalid input syntax for type uuid
    throw new BadRequestException('Invalid UUID format');
  }

  logger.error(error);
  throw new InternalServerErrorException(
    'Unexpected database error, check logs',
  );
}
