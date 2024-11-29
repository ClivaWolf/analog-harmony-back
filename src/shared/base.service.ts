import { FindOneOptions, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T> {
    protected constructor(
        protected readonly repository: Repository<T>,
        // protected readonly dtoClass: new (...args: any[]) => Dto
    ) {}

    async create(entity: T): Promise<T> {
        // const entity = new this.dtoClass(dto);
        return await this.repository.save(entity);
    }

    async findOne(options: FindOneOptions<T>): Promise<T> {
        return this.repository.findOne(options);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async update(id: string, options: FindOneOptions<T>, dto: Partial<T>): Promise<T> {
        await this.repository.update(id, dto as QueryDeepPartialEntity<T>);
        return this.findOne(options);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
