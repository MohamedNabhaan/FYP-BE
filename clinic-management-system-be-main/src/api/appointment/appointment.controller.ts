import {
  Controller,
  Get,
  Post,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { AppointmentService } from './appointment.service';
import { CreateUpdateAppointmentDto } from './appointment.dto';
import { Appointment } from './appointment.entity';

@Controller('appointment')
export class AppointmentController {
  @Inject(AppointmentService)
  private readonly service: AppointmentService;

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private createAppointment(
    @Body() body: CreateUpdateAppointmentDto,
  ): Promise<Appointment | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  private findAll(): Promise<Appointment[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  private findOne(@Param() params): Promise<Appointment> {
    return this.service.findById(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private delete(@Param() params) {
    return this.service.delete(params.id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  private update(@Param() params, @Body() body: CreateUpdateAppointmentDto) {
    return this.service.update(params.id, body);
  }
}
