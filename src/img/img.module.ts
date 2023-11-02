import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entitiy';
import { Product, ProductSchema } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ImgController],
  providers: [ImgService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
})
export class ImgModule {}
