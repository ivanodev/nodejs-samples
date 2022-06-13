import { createPermissionsAuto } from '@common/infra/http/middlewares/create-permissions';
import CreateMasterUserService from '@modules/actor/services/User/CreateMasterUserService';
import { createConnection } from 'typeorm';

//TODO: COLOCAR ESTE CONTROLE NO BANCO DE DADOS OU EM ARQUIVO
//TAL INFORMAÇÃO DEVE SEMPRE VOLTAR PARA TRUE QUANDO SUBIR UMA NOVA VERSÃO
//E NO FINAL DA EXECUÇÃO RETORNAR PARA FALSE
const createPermissions = false;

createConnection().then(async () => {

  const createUserMaster = new CreateMasterUserService();
  await createUserMaster.execute();

  if (createPermissions) {
    console.log('Checking and creating non-existent user permissions...');
    await createPermissionsAuto();
    console.log('Verification and creation of permissions completed successfully.');
  }

}).catch((err) => {

  console.log(`Database connection error. - ${(err as any).message}. Check your network connection.`);
});
