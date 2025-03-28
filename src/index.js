const seedPermissions = require("./seeders/seed_permissions");
const seed_roles = require("./seeders/seed_roles");
const seed_users = require("./seeders/seed_users");
const seed_colors = require("./seeders/seed_colors");

async function startApp() {
    try {
        await seedPermissions();
        await seed_roles();
        await seed_users();
        await seed_colors();

        console.log("🚀 Seeding process completed.");
        process.exit();
    } catch (error) {
        console.error("❌ Error running the application:", error);
        process.exit(1);
    }
}

startApp();
