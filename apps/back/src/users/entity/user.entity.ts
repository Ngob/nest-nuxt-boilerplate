import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index} from 'typeorm';
import {PasswordAuthenticatedUser} from "../type/user";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
export class User implements PasswordAuthenticatedUser {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({
    transformer: {
      to (initialValue: string): string  {
        return bcrypt.hashSync(initialValue, 10);
      },
      from(value) {
        return value;
      }
    }
  })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  public checkPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }
}