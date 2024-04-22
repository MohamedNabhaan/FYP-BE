import { IsString, IsDateString } from 'class-validator';

export class CreateUpdateAppointmentDto {
  @IsString()
  public readonly title: string;

  @IsString()
  public readonly patientId: string;

  @IsDateString()
  public readonly start: Date;

  @IsDateString()
  public readonly end: Date;
}
