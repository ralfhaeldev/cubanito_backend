import { Role } from '../enums/roles.enum';
export declare class PaginationDto {
    limit?: number;
    offset?: number;
    term: string;
    role?: Role;
}
