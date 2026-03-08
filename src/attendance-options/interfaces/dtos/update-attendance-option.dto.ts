import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceOptionDto } from './create-attendance-option.dto';

export class UpdateAttendanceOptionDto extends PartialType(
  CreateAttendanceOptionDto,
) {}
