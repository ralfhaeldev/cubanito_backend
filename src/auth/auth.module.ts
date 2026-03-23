import { Module } from '@nestjs/common';
import { AuthController, UsuariosController } from './interfaces/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { CreateAuthUseCase } from './application/use-cases/create-auth.use-case';
import { TypeormAuthRepository } from './infrastructure/repositories/typeorm-auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepository } from './domain/auth-repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  controllers: [AuthController, UsuariosController],
  providers: [
    JwtStrategy,
    CreateAuthUseCase,
    TypeormAuthRepository,
    {
      provide: AuthRepository,
      useExisting: TypeormAuthRepository,
    },
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
