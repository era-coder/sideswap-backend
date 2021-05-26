import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

// export enum Chain {
//   MAINCHAIN = 'mainchain',
//   TESTCHAIN = 'testchain',
//   THUNDER = 'thunder',
//   ZSIDE = 'zside',
// }

@ObjectType()
@Entity()
export class Invoice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  depositChain: string

  @Field()
  @Column()
  depositAddress: string

  @Field()
  @Column()
  receiveChain: string

  @Field()
  @Column()
  receiveAddress: string

  @Field()
  @Column({ default: false })
  hasDeposited: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
