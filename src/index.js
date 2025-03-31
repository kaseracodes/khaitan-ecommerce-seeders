const seedPermissions = require("./seeders/seed_permissions");
const seedRoles = require("./seeders/seed_roles");
const seedUsers = require("./seeders/seed_users");
const seedColors = require("./seeders/seed_colors");
const seedCategoriesAndAttributes = require("./seeders/seed_categories_and_attributes");
const seedProducts = require("./seeders/seed_products");

async function startApp() {
    try {
        await seedPermissions();
        await seedRoles();
        await seedUsers();
        await seedColors();
        await seedCategoriesAndAttributes();
        await seedProducts();

        console.log("🚀 Seeding process completed.");
        process.exit();
    } catch (error) {
        console.error("❌ Error running the application:", error);
        process.exit(1);
    }
}

startApp();
