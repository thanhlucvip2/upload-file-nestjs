import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
@Entity()
export class UploadFileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'text' })
  typeFile: string;
  @Column({ type: 'text' })
  size: string;
  @Column({ type: 'text' })
  fileName: string;
  @Column({ type: 'text' })
  urlFile: string;
  @Column({ type: 'text' })
  fileId: string;
}
