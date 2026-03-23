import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TypePaymentModule } from './type-payment/type-payment.module';
import { TypeIdentificationModule } from './type-identification/type-identification.module';
import { AttendanceOptionsModule } from './attendance-options/attendance-options.module';
import { BranchesModule } from './branches/branches.module';
import { InventoryModule } from './inventory/inventory.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { OrdersModule } from './orders/orders.module';
import { ReportsModule } from './reports/reports.module';
import { CajaModule } from './caja/caja.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    CommonModule,
    AuthModule,
    ClientsModule,
    TypePaymentModule,
    TypeIdentificationModule,
    AttendanceOptionsModule,
    BranchesModule,
    InventoryModule,
    IngredientsModule,
    OrdersModule,
    ReportsModule,
    CajaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
