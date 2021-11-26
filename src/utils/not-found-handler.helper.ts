import { NotFoundException } from '@nestjs/common';

export function handlingNotFoundException<T>(resource: T): T {
  if (!resource) {
    throw new NotFoundException();
  }

  return resource;
}
