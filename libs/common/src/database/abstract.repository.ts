import { AbstractEntity } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";
import { EntityManager, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository <T extends AbstractEntity<T>> {
    protected abstract readonly logger: Logger
    constructor(
        private readonly entityRepository: Repository<T>,
        private readonly entityManager: EntityManager
        ){}

    async create(entity: T): Promise<T> {
       return this.entityManager.save(entity)
    }

    async findOne(where: FindOptionsWhere<T>, relations?: FindOptionsRelations<T>): Promise<T> {
        const entity = await this.entityRepository.findOne({where, relations});
       if(!entity) {
        this.logger.warn('Entity was not found with filter query', where)
        throw new NotFoundException('Document was not found');
       }
       return entity;
    }

    async findOneAndUpdate(
        where: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>
    ): Promise<T> {
       const updateResult = await this.entityRepository.update(where, partialEntity);
        if(!updateResult.affected) {
            this.logger.warn('Entity was not found with where', where)
            throw new NotFoundException('Entity was not found');
        }
        return this.findOne(where);
    }

    async find(where: FindOptionsWhere<T>): Promise<T[]> {
        return this.entityRepository.findBy(where);
    }
    async findOneAndDelete(where: FindOptionsWhere<T>) {
        await this.entityRepository.delete(where)
    }
}