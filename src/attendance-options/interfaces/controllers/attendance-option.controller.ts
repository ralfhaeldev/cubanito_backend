import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAttendanceOptionDto } from '../dtos/create-attendance-option.dto';
import { CreateAttendanceOptionUseCase } from 'src/attendance-options/application/use-cases/create-attendance-option.use-case';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateAttendanceOptionDto } from '../dtos/update-attendance-option.dto';

@Controller('attendance-options')
export class AttendanceOptionController {
  constructor(
    private readonly createAttendanceOptionUseCase: CreateAttendanceOptionUseCase,
  ) {}

  @Post()
  create(@Body() createAttendanceOptionDto: CreateAttendanceOptionDto) {
    return this.createAttendanceOptionUseCase.create(createAttendanceOptionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.createAttendanceOptionUseCase.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createAttendanceOptionUseCase.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAttendanceOptionDto: UpdateAttendanceOptionDto,
  ) {
    return this.createAttendanceOptionUseCase.update(
      id,
      updateAttendanceOptionDto,
    );
  }
}
