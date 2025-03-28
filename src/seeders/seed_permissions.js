const { Permission } = require("../models"); 
const permissions = require("../data/permissions_data"); 
const db = require("../config/db_config");

async function seedPermissions() {
    try {
        await db.authenticate(); // Ensure DB is connected
        console.log("✅ Connected to the database.");

        for (const permission of permissions) {
            const [perm, created] = await Permission.findOrCreate({
                where: { name: permission.name },
                defaults: permission
            });

            if (created) {
                console.log(`✅ Inserted: ${permission.name}`);
            } else {
                console.log(`⚠️ Already exists: ${permission.name}`);
            }
        }

        console.log("🎉 Permissions seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding permissions:", error);
    }
}

module.exports = seedPermissions;
