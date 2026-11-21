import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;

  @Column({ name: 'payment_method', type: 'varchar', nullable: true })
  paymentMethod?: string;

  @Column({ type: 'decimal', nullable: true })
  amount?: string;

  @Column({ name: 'payment_status', type: 'varchar', nullable: true })
  paymentStatus?: string;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date;
}