import { NestFactory } from '@nestjs/core';

import { MigrationModule } from './migrations/MigrationModule';
import { ProductsServiceMigration } from './migrations/services/ProductsServiceMigration';

export class Migration {
  async init(): Promise<void> {
    if (process.argv[2] === '-l') {
      await this.loadTable();
      process.exit();
    }

    if (process.argv[2] === '-d') {
      await this.deleteData();
      process.exit();
    }
  }

  async loadTable(): Promise<void> {
    const app = await NestFactory.createApplicationContext(MigrationModule);
    const service = app.get(ProductsServiceMigration);
    await service.loadTable();
  }

  async deleteData(): Promise<void> {
    const app = await NestFactory.createApplicationContext(MigrationModule);
    const service = app.get(ProductsServiceMigration);
    await service.deleteData();
  }
}

new Migration().init();
