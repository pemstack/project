import { BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'

export async function ensureValid<T extends object>(obj: T): Promise<T> {
  const errors = await validate(obj)
  if (errors.length) {
    throw new BadRequestException(errors)
  } else {
    return obj
  }
}
