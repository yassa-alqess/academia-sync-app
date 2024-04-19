import Role from './models/role';
import Permission from './models/permission';
import RolePermission from './models/role-permission'; 

export const seedRoles = async () => {
  
  const permissionsData = [
    { name: 'create' },
    { name: 'read' },
    { name: 'update' },
    { name: 'delete' },
  ];

  const permissions = await Permission.bulkCreate(permissionsData);

  const rolesData = [
    { name: 'Admin', permissionIds: permissions.map(permission => permission.permissionId) },
    { name: 'Student', permissionIds: permissions.map(permission => permission.permissionId) },
    { name: 'Instructor', permissionIds: permissions.map(permission => permission.permissionId) },
  ];

  await Promise.all(
    rolesData.map(async (roleData) => {
      const role = await Role.create({ name: roleData.name });

      await Promise.all(
        roleData.permissionIds.map(async (permissionId) => {
          await RolePermission.create({ roleId: role.roleId, permissionId: permissionId });
        })
      );
    }),
  );
};
