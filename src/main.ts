import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';

import * as cluster from 'cluster';
import * as os from 'os';
import { Logger } from '@nestjs/common';

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    Logger.log('Worker ' + worker.process.pid + ' is online.');
  });
  cluster.on('exit', ({ process }, code, signal) => {
    Logger.log('worker ' + process.pid + ' died.');
  });
} else {

  async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );

    app.useStaticAssets({
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });
    app.setViewEngine({
      engine: {
        handlebars: require('ejs'),
      },
      templates: join(__dirname, '..', 'views'),
    });

    await app.listen(3000);
  }
  bootstrap();
}
