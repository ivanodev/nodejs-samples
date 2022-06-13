class RoleDTO {

  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date
  createdBy: string;
  updatedBy: string;
}

export default RoleDTO