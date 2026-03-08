import { Sex } from 'src/clients/domain/enums/sex.enum';
export declare class CreateClientDto {
    typeIdentificationId: string;
    identification: string;
    name: string;
    fullName: string;
    address: string;
    phone: string;
    birthDate: Date;
    sex: Sex;
}
