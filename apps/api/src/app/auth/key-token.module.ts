import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyToken, KeyTokenSchema } from './entities/key-token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KeyToken.name, schema: KeyTokenSchema }]),
  ],
  exports: [MongooseModule],
})
export class KeyTokenModule {}
