const { Color } = require("../models");
const db = require("../config/db_config");
const colorsData = require("../data/colors_data");

async function seedColors() {
    try {
        await db.authenticate(); 
        console.log("✅ Connected to the database.");

        for (const color of colorsData) {
            console.log("🔍 Seeding color:", color);
  
            const [c, created] = await Color.findOrCreate({
                where: { colorHex: color.colorHex },
                defaults: color
            });

            if (created) {
                console.log(`✅ Inserted color: ${color.colorName} (${color.colorHex})`);
            } else {
                console.log(`⚠️ Color already exists: ${color.colorName} (${color.colorHex})`);
            }
        }

        console.log("🎨 Colors seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding colors:", error);
    }
}

module.exports = seedColors;
