const { Role, RolePermissions, Permission } = require("../models");
const db = require("../config/db_config");
const rolesData = require("../data/roles_data"); // ✅ Import roles data

async function seedRoles() {
    try {
        await db.authenticate(); // Ensure DB is connected
        console.log("✅ Connected to the database.");

        // Insert roles
        const createdRoles = {};
        for (const role of rolesData) {
            const [r, created] = await Role.findOrCreate({
                where: { name: role.name },
                defaults: role
            });
            createdRoles[role.name] = r.id; // Store role IDs for later use

            if (created) {
                console.log(`✅ Inserted role: ${role.name}`);
            } else {
                console.log(`⚠️ Role already exists: ${role.name}`);
            }
        }

        // Fetch all permissions
        const permissions = await Permission.findAll();
        const permissionIds = permissions.map(p => p.id);

        if (permissionIds.length === 0) {
            console.log("❌ No permissions found. Ensure permissions are seeded first.");
            return;
        }

        // Assign all permissions to Developer and CEO
        const rolesWithPermissions = ["Developer", "CEO"];

        for (const roleName of rolesWithPermissions) {
            const roleId = createdRoles[roleName];

            for (const permissionId of permissionIds) {
                const [rp, created] = await RolePermissions.findOrCreate({
                    where: { roleId, permissionId },
                    defaults: { roleId, permissionId }
                });
                if (!created){
                    console.log(`⚠️ Permission ID: ${permissionId} already exists in: ${roleName}`);
                }
            }

            console.log(`✅ Assigned all permissions to ${roleName}`);
        }

        console.log("🎉 Roles and role-permissions seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding roles:", error);
    }
}

module.exports = seedRoles;
