import 'reflect-metadata';
import express from 'express';
import exceptionHandler from './common/infra/http/middlewares/error-handler'; 
import cors from 'cors';
import routes from './common/infra/http/routes';
import ServerContext from '@common/infra/server/ServerContext';
import uploadConfig from '@config/upload';

const PORT = 4001;
const HOST = '0.0.0.0';

import './database';
import './common/container';

ServerContext.createNamespace();
const app = express();
app.use( ServerContext.initContext() );

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));
app.use(exceptionHandler);

app.listen(PORT, HOST, () => {
  console.log(`🚀 API started on port ${PORT}!`);
});