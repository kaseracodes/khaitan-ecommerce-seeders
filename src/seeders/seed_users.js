const { User } = require("../models");
const db = require("../config/db_config");
const usersData = require("../data/users_data");

async function seedUsers() {
    try {
        await db.authenticate(); // Ensure DB is connected
        console.log("✅ Connected to the database.");

        for (const user of usersData) {
            const [u, created] = await User.findOrCreate({
                where: { email: user.email },
                defaults: user
            });

            if (created) {
                console.log(`✅ Inserted user: ${user.email}`);
            } else {
                console.log(`⚠️ User already exists: ${user.email}`);
            }
        }

        console.log("🎉 Users seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding users:", error);
    }
}

module.exports = seedUsers;
