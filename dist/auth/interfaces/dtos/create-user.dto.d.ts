import { Role } from 'src/common/enums/roles.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    roles: Role[];
}
