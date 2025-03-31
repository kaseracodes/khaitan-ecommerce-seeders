const db = require('../config/db_config');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const Product = require('../models/product');
const Attribute = require('../models/attribute');
const Media = require('../models/media');
const Color = require('../models/color');
const Category = require('../models/category');
const ProductAttributes = require('../models/products_attributes');
const productsData = require('../data/products_data');

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Function to upload image to S3
async function uploadToS3(imageBuffer, fileName) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `products/${fileName}`,
        Body: imageBuffer,
        ContentType: 'image/jpeg'
    };

    const upload = await s3.upload(params).promise();
    return upload.Location; // Returns the S3 URL
}

// Function to download image from Firebase Storage
async function downloadImage(url) {
    try {
        const response = await axios({
            url,
            responseType: 'arraybuffer' // Get binary data
        });
        return Buffer.from(response.data); // Convert to buffer
    } catch (error) {
        console.error(`Failed to download image: ${url}`, error);
        return null;
    }
}

// Seeding function
async function seedProducts() {
    try {
        await db.authenticate(); 
        console.log("✅ Connected to the database.");

        for (const productData of productsData) {
            // Fetch category ID
            const category = await Category.findOne({ where: { name: productData.category } });
            if (!category) {
                console.error(`❌ Category not found: ${productData.category}`);
                continue;
            }

            // Insert product
            const product = await Product.create({
                title: productData.name,
                description: productData.description,
                price: productData.price,
                categoryId: category.id,
            });

            // Insert product attributes
            for (const attr of productData.attributes) {
                const attribute = await Attribute.findOne({
                    where: { name: attr.name, categoryId: category.id },
                });
                if (!attribute) {
                    console.error(`⚠️ Attribute not found: ${attr.name} for category ${category.name}`);
                    continue;
                }
                
                await ProductAttributes.create({
                    productId: product.id,
                    attributeId: attribute.id,
                    value: attr.value,
                });
            }

            // Insert media
            for (const mediaItem of productData.media) {
                const color = mediaItem.colorHex 
                    ? await Color.findOne({ where: { colorHex: mediaItem.colorHex } }) 
                    : null;

                if (mediaItem.colorHex && !color) {
                    console.warn(`⚠️ Color not found for hex: ${mediaItem.colorHex}`);
                }

                // Download image from Firebase
                const imageBuffer = await downloadImage(mediaItem.imageUrl);
                if (!imageBuffer) continue; // Skip if failed to download

                // Generate unique filename
                const fileName = `${product.id}_${Date.now()}.jpg`;

                // Upload to S3
                const s3Url = await uploadToS3(imageBuffer, fileName);
                console.log(`✅ Uploaded to S3: ${s3Url}`);

                // Insert into Media table
                await Media.create({
                    type: 'image',
                    url: s3Url,
                    productId: product.id,
                    colorId: color ? color.id : null,
                });
            }
        }

        console.log('✅ Products, attributes, and media seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    } finally {
        await db.close();
    }
}

module.exports = seedProducts;
