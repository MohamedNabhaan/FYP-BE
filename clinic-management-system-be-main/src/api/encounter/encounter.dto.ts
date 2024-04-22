import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateUpdateEncounterDto {
  @IsString()
  public readonly diagnosis: string;

  @IsString()
  public readonly serviceDate: string;

  @IsString()
  @IsOptional()
  public readonly additionalNotes: string;

  @IsString()
  public readonly patientId: string;

  @IsString()
  @IsOptional()
  public readonly nextAppointment: string;

  @IsString()
  public readonly doctor: string;
}
