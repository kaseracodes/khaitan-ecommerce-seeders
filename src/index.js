const seedPermissions = require("./seeders/seed_permissions");
const seed_roles = require("./seeders/seed_roles");

async function startApp() {
    try {
        await seedPermissions();
        await seed_roles();

        console.log("🚀 Seeding process completed.");
        process.exit();
    } catch (error) {
        console.error("❌ Error running the application:", error);
        process.exit(1);
    }
}

startApp();
