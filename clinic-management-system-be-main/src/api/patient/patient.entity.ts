import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { Encounter } from '../encounter/encounter.entity';

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public firstName!: string;

  @Column({ type: 'varchar' })
  public lastName!: string;

  @Column({ type: 'varchar' })
  public contactNumber!: string;

  @Column({ type: 'varchar' })
  public gender!: string;

  @Column({ type: 'varchar', nullable: true })
  public address: string | null;

  @Column({ type: 'varchar', nullable: true })
  public city: string | null;

  @Column({ type: 'varchar', nullable: true })
  public postcode: string | null;

  @Column({ type: 'varchar', nullable: true })
  public dob: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyFirstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyLastName: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyContact: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyRelationship: string | null;

  @Column({ type: 'varchar', nullable: true })
  public medicalDetails: string | null;

  @Column({ type: 'varchar', nullable: true })
  public allergicDetails: string | null;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    cascade: true,
  })
  appointments: Appointment[];

  @OneToMany(() => Encounter, (encounter) => encounter.patient, {
    cascade: true,
  })
  encounters: Encounter[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
