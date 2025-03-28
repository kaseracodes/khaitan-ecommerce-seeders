const { Category, Attribute } = require("../models");
const db = require("../config/db_config");
const categoriesData = require("../data/categories_and_attributes_data");

async function seedCategoriesAndAttributes() {
    try {
        await db.authenticate();
        console.log("✅ Connected to the database.");

        for (const categoryData of categoriesData) {
            // Check if the category exists
            const [category, created] = await Category.findOrCreate({
                where: { name: categoryData.name },
                defaults: {
                    description: categoryData.description
                }
            });

            if (created) {
                console.log(`✅ Inserted category: ${categoryData.name}`);
            } else {
                console.log(`⚠️ Category already exists: ${categoryData.name}`);
            }

            // Seed attributes for the category
            for (const attrData of categoryData.attributes) {
                const [attribute, attrCreated] = await Attribute.findOrCreate({
                    where: { name: attrData.name, categoryId: category.id }, // Ensure uniqueness
                    defaults: {
                        categoryId: category.id,
                        dataType: attrData.dataType,
                        unit: attrData.unit
                    }
                });

                if (attrCreated) {
                    console.log(`✅ Inserted attribute: ${attrData.name} (Category: ${categoryData.name})`);
                } else {
                    console.log(`⚠️ Attribute already exists: ${attrData.name} (Category: ${categoryData.name})`);
                }
            }
        }

        console.log("🎉 Categories and attributes seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding categories and attributes:", error);
    }
}

module.exports = seedCategoriesAndAttributes;
