import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsString()
  public readonly contactNumber: string;

  @IsString()
  public readonly gender: string;

  @IsString()
  public readonly address: string;

  @IsString()
  public readonly city: string;

  @IsString()
  public readonly postcode: string;

  @IsString()
  public readonly dob: string;

  @IsString()
  public readonly emergencyFirstName: string;

  @IsString()
  public readonly emergencyLastName: string;

  @IsString()
  public readonly emergencyContact: string;

  @IsString()
  public readonly emergencyRelationship: string;

  @IsString()
  public readonly medicalDetails: string;

  @IsString()
  public readonly allergicDetails: string;
}

export class UpdatePatientDto {
  @IsString()
  @IsOptional()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  public readonly lastName?: string;

  @IsString()
  @IsOptional()
  public readonly contactNumber: string;

  @IsString()
  @IsOptional()
  public readonly gender: string;

  @IsString()
  @IsOptional()
  public readonly address: string;

  @IsString()
  @IsOptional()
  public readonly city: string;

  @IsString()
  @IsOptional()
  public readonly postcode: string;

  @IsString()
  @IsOptional()
  public readonly dob: string;

  @IsString()
  @IsOptional()
  public readonly emergencyFirstName: string;

  @IsString()
  @IsOptional()
  public readonly emergencyLastName: string;

  @IsString()
  @IsOptional()
  public readonly emergencyContact: string;

  @IsString()
  @IsOptional()
  public readonly emergencyRelationship: string;

  @IsString()
  @IsOptional()
  public readonly medicalDetails: string;

  @IsString()
  @IsOptional()
  public readonly allergicDetails: string;
}
