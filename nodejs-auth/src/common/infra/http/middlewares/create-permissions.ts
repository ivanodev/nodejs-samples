import AppError from "@common/errors/app-error";
import Permission from "@modules/access/model/Permission";
import CreatePermissionService from "@modules/access/services/permission/CreatePermissionService";
import LoadPermissionService from "@modules/access/services/permission/LoadPermissionService";
import { PermissionId } from "@modules/access/types";
import { container } from "tsyringe";

const addPermission = async (name: string, description: string, parentPermission?: PermissionId | undefined): Promise<Permission | undefined> => {

  const createPermission = container.resolve(CreatePermissionService);
  const loadPermission = container.resolve(LoadPermissionService);

  const permissionExist = await loadPermission.findByName(name);

  if (!permissionExist) {

    const newPermision = {
      name,
      description,
      createdBy: '83f79dd6-1585-46ef-8b5a-136503d482fd'
    } as any;

    if (parentPermission) {

      newPermision['parentPermission'] = parentPermission;
    }

    return await createPermission.execute(newPermision as Permission);
  }
}

export async function createPermissionsAuto(): Promise<void> {

  try {

    // Permissions
    const permission = await addPermission('PERMISSION', 'Permissão de acesso');

    await addPermission('CREATE_PERMISSION', 'Criar permissão de acesso', permission?.id);
    await addPermission('EDIT_PERMISSION', 'Editar permissão de acesso', permission?.id);
    await addPermission('FIND_PERMISSION', 'Pesquisar permissões de acesso', permission?.id);
    await addPermission('DELETE_PERMISSION', 'Excluir permissão de acesso', permission?.id);


    // Roles
    const role = await addPermission('ROLE', 'Grupo de acesso');

    if (role) {
      await addPermission('CREATE_ROLE', 'Criar grupo de acesso', role?.id);
      await addPermission('EDIT_ROLE', 'Editar grupo de acesso', role?.id);
      await addPermission('FIND_ROLE', 'Pesquisar grupo de acesso', role?.id);
      await addPermission('DELETE_ROLE', 'Excluir grupo de acesso', role?.id);
    }

    // Actor
    const ator = await addPermission('ACTOR', 'Ator do sistema');

    await addPermission('CREATE_ACTOR', 'Criar ator', ator?.id);
    await addPermission('EDIT_ACTOR', 'Editar ator', ator?.id);
    await addPermission('FIND_ACTOR', 'Pesquisar atores', ator?.id);
    await addPermission('DELETE_ACTOR', 'Excluir grupo de acesso', ator?.id);

    // User
    const user = await addPermission('USER', 'Usuário');

    await addPermission('CREATE_USER', 'Criar usuário', user?.id);
    await addPermission('EDIT_USER', 'Editar usuário', user?.id);
    await addPermission('FIND_USER', 'Pesquisar usuário', user?.id);
    await addPermission('DELETE_USER', 'Excluir usuário', user?.id);

    // Comapny
    const company = await addPermission('COMPANY', 'Empresa');

    await addPermission('CREATE_COMPANY', 'Criar empresa', company?.id);
    await addPermission('EDIT_COMPANY', 'Editar empresa', company?.id);
    await addPermission('FIND_COMPANY', 'Pesquisar empresa', company?.id);
    await addPermission('DELETE_COMPANY', 'Excluir empresa', company?.id);


    // Contact
    const contact = await addPermission('CONTACT', 'Contato');

    await addPermission('CREATE_CONTACTO', 'Criar contato', contact?.id);
    await addPermission('EDIT_CONTACTO', 'Editar contato', contact?.id);
    await addPermission('FIND_CONTACTO', 'Pesquisar contato', contact?.id);
    await addPermission('DELETE_CONTACTO', 'Excluir contato', contact?.id);


    // Employee
    const employee = await addPermission('EMPLOYEE', 'Funcionário');

    await addPermission('CREATE_EMPLOYEE', 'Criar funcionário', employee?.id);
    await addPermission('EDIT_EMPLOYEE', 'Editar funcionário', employee?.id);
    await addPermission('FIND_EMPLOYEE', 'Pesquisar funcionário', employee?.id);
    await addPermission('DELETE_EMPLOYEE', 'Excluir funcionário', employee?.id);

    // Professional Profile
    const professionalProfile = await addPermission('PROFESSIONAL PROFILE', 'Perfil Profissional');

    await addPermission('CREATE_PROFESSIONAL_PROFILE', 'Criar perfil professional', professionalProfile?.id);
    await addPermission('EDIT_PROFESSIONAL_PROFILE', 'Editar perfil professional', professionalProfile?.id);
    await addPermission('FIND_PROFESSIONAL_PROFILE', 'Pesquisar perfil professional', professionalProfile?.id);
    await addPermission('DELETE_PROFESSIONAL_PROFILE', 'Excluir perfil professional', professionalProfile?.id);


    // Skill
    const skill = await addPermission('SKILL', 'Skill');

    await addPermission('CREATE_SKILL', 'Criar skill', skill?.id);
    await addPermission('EDIT_SKILL', 'Editar skill', skill?.id);
    await addPermission('FIND_SKILL', 'Pesquisar skill', skill?.id);
    await addPermission('DELETE_SKILL', 'Excluir skill', skill?.id);


    // Supllier
    const supplier = await addPermission('SUPPLIER', 'Fornecedor');

    await addPermission('CREATE_SUPPLIER', 'Criar fornecedor', supplier?.id);
    await addPermission('EDIT_SUPPLIER', 'Editar fornecedor', supplier?.id);
    await addPermission('FIND_SUPPLIER', 'Pesquisar fornecedor', supplier?.id);
    await addPermission('DELETE_SUPPLIER', 'Excluir fornecedor', supplier?.id);


    // Ceremony
    const ceremony = await addPermission('CEREMONY', 'Cerimônia');

    await addPermission('CREATE_CEREMONY', 'Criar cerimônia', ceremony?.id);
    await addPermission('EDIT_CEREMONY', 'Editar cerimônia', ceremony?.id);
    await addPermission('FIND_CEREMONY', 'Pesquisar cerimônia', ceremony?.id);
    await addPermission('DELETE_CEREMONY', 'Excluir cerimônia', ceremony?.id);

    // POSITION SQUAD
    const positionSquad = await addPermission('POSITION_SQUAD', 'Posição da squad');

    await addPermission('CREATE_POSITION_SQUAD', 'Criar posição na squad', positionSquad?.id);
    await addPermission('EDIT_POSITION_SQUAD', 'Editar posição na squad', positionSquad?.id);
    await addPermission('FIND_POSITION_SQUAD', 'Pesquisar posição na squad', positionSquad?.id);
    await addPermission('DELETE_POSITION_SQUAD', 'Excluir posição na squad', positionSquad?.id);


    // SQUAD
    const squad = await addPermission('SQUAD', 'Squad');

    await addPermission('CREATE_SQUAD', 'Criar squad', squad?.id);
    await addPermission('EDIT_SQUAD', 'Editar squad', squad?.id);
    await addPermission('FIND_SQUAD', 'Pesquisar squad', squad?.id);
    await addPermission('DELETE_SQUAD', 'Excluir squad', squad?.id);

    const billing = await addPermission('BILLING_SUPPLIER', 'Faturamento do fornecedor');

    await addPermission('SEE_BILLING_SUPPLIER', 'Acessar faturamento do fornecedor', billing?.id);
    await addPermission('SEE_BILLING_SUPPLIER_BY_SQUAD', 'Acessar faturamento do fornecedor por squad', billing?.id);

    await addPermission('SEND_BILLING_INVOICE', 'Enviar nota fiscal do faturamento', billing?.id);
    await addPermission('CREATE_BILLING', 'Criar Faturamento', billing?.id);
    await addPermission('EDIT_BILLING', 'Editar faturamento', billing?.id);
    await addPermission('SEND_BILLING', 'Enviar faturamento', billing?.id);
    await addPermission('SEE_BILLING_LIST_PENDING_APPROVAL', 'Listar faturamento pendente de aprovação', billing?.id);
    await addPermission('SEE_BILLING_WORK_HOURS_PENDING_APPROVAL', 'Listar horas de trabalho do faturamento pendente de validação', billing?.id);

    const workHour = await addPermission('WORK_HOUR', 'Horas trabalhadas');
    await addPermission('SEE_WORK_HOUR_BY_EMPLOYEE', 'Acessar horas trabalhadas de funcionários', workHour?.id);
    await addPermission('VALIDATE_HOURS_WORKED', 'Validar horas trabalhadas', workHour?.id);
    await addPermission('APPROVE_HOURS_WORKED', 'Aprovar horas trabalhadas', workHour?.id);

    await addPermission('SEE_WORK_HOURS_PENDING_VALIDATION', 'Listar horas de trabalho pendente de validação', workHour?.id);
  } catch (err) {

    new AppError('Erro do cadastrar permissiões', 500);
  }

}


