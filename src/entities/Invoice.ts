import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

export enum Chain {
  MAINCHAIN = 'mainchain',
  TESTCHAIN = 'testchain',
  THUNDER = 'thunder',
  ZSIDE = 'zside',
}

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: Chain })
  depositChain: Chain

  @Column()
  depositAddress: string

  @Column({ type: 'enum', enum: Chain })
  receiveChain: Chain

  @Column()
  receiveAddress: string

  @Column()
  hasDeposited: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
