import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'order_number', type: 'varchar', nullable: true })
  orderNumber?: string;

  @Column({ name: 'total_amount', type: 'decimal', nullable: true })
  totalAmount?: string;

  @Column({ type: 'varchar', nullable: true })
  status?: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;
}