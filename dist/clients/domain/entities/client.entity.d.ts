import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { Sex } from '../enums/sex.enum';
export declare class ClientEntity {
    id: string;
    typeIdentification: TypeIdentificationEntity;
    identification: string;
    name: string;
    fullName: string;
    address: string;
    birthDate: Date;
    phone: string;
    sex: Sex;
}
