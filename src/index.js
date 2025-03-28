const seedPermissions = require("./seeders/seed_permissions");
const seed_roles = require("./seeders/seed_roles");
const seed_users = require("./seeders/seed_users");

async function startApp() {
    try {
        await seedPermissions();
        await seed_roles();
        await seed_users();

        console.log("🚀 Seeding process completed.");
        process.exit();
    } catch (error) {
        console.error("❌ Error running the application:", error);
        process.exit(1);
    }
}

startApp();
