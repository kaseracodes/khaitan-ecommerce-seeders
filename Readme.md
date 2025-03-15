# Introduction

- This project aims to populated khaitan ecommerce db with seed data making it up and ready for dev, prod or local environments. 

- It uses the same models and db configurations as khaitan-ecommerce-backend to populate the database.

- Process of seeding the data is updated. Instead of using backend api calls we are using sequelize functions to seed the database so as to avoid the complexities of managing login and RBAC

- This is a temporary project which is using the manual method of seeding the db instead of using seeders provided by sequelize-cli. The aim to completely migrate to sequelize-cli seeders in future. 

# How to use this repo?

Provide the credetials of your databse (be it dev, prod or local) in the .env file and run the project. The structure of .env is same as the khaitan-ecommerce-backend repo to maintain consistency. Running the project should successfully add seed data to your desired database. 