import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import { JwtPayload } from '../interfaces/dtos/jwt-payload.interace';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userReposity;
    constructor(userReposity: Repository<UserEntity>);
    validate(payload: JwtPayload): Promise<UserEntity>;
}
export {};
