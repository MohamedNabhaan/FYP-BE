import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Encounter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public diagnosis: string;

  @Column({ type: 'varchar' })
  public additionalNotes!: string;

  @Column({ type: 'varchar', nullable: true })
  public serviceDate!: string;

  @Column({ type: 'varchar', nullable: true })
  public nextAppointment!: string;

  @Column({ type: 'varchar' })
  public doctor: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.encounters, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
