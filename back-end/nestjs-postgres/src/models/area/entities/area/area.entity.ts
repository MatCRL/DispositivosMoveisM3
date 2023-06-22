import { Map } from '../../../map/entities/map.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ type: 'point' })
  coordenadas: string;

  @ManyToOne(() => Map, map => map.areas)
  map: Map;
}
