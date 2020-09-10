import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

// import * as cluster from 'cluster';
// import * as os from 'os';
// import { Logger } from '@nestjs/common';

// if (cluster.isMaster) {
//   const cpuCount = os.cpus().length;

//   for (let i = 0; i < cpuCount; i += 1) {
//     cluster.fork();
//   }

//   cluster.on('online', worker => {
//     Logger.log('Worker ' + worker.process.pid + ' is online.');
//   });
//   cluster.on('exit', ({ process }, code, signal) => {
//     Logger.log('worker ' + process.pid + ' died.');
//   });
// } else {

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
// }