import { Role } from 'src/common/enums/roles.enum';
export declare const META_ROLES = "roles";
export declare const RoleProtected: (...args: Role[]) => import("@nestjs/common").CustomDecorator<string>;
