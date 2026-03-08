import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CrudTypePaymenUseCase } from 'src/type-payment/application/use-cases/crud-type-paymen.use-case';
export declare class TypePaymenController {
    private readonly curdTypePayment;
    constructor(curdTypePayment: CrudTypePaymenUseCase);
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/type-paymen.entity").TypePaymenEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/type-paymen.entity").TypePaymenEntity>;
}
