const seedPermissions = require("./seeders/seed_permissions");

async function startApp() {
    try {
        await seedPermissions();

        console.log("🚀 Seeding process completed.");
        process.exit();
    } catch (error) {
        console.error("❌ Error running the application:", error);
        process.exit(1);
    }
}

startApp();
