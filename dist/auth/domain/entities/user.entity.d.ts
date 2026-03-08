import { Role } from 'src/common/enums/roles.enum';
export declare class UserEntity {
    id: string;
    email: string;
    pawssowrd: string;
    fullName: string;
    isActive: boolean;
    roles: Role[];
    checkFieldInsert(): void;
    checkFieldUpdate(): void;
    json(): {
        id: string;
        fullName: string;
        roles: Role[];
    };
}
