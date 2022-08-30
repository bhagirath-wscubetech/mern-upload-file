import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import { dbConnect } from "./database.js";
import Product from "./models/Product.js";
import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
const app = express();
dotenv.config({
    path: "./.env"
})

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const dbRes = await dbConnect();
if (dbRes) {
    app.use(express.json());
    // console.log(path.join(__dirname, "public"));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(
        cors({
            origin: "*"
        })
    );
    app.get(
        "/products",
        async(req, res) => {
            let status, resonse;
            try {
                const products = await Product.find();
                status = 200;
                resonse = {
                    products,
                    flag: 1,
                    msg: `Total ${products.length} products found`,
                    imgBaseUrl: "http://localhost:5000/images/products/"
                }
            } catch (err) {
                status = 500;
                resonse = {
                    flag: 0,
                    msg: `Some internal server error`
                }
            }
            res.status(status).json(resonse);
        }
    )

    app.post(
        "/upload",
        fileUpload({
            createParentPath: true
        }),
        async(req, res) => {
            let status, response = {
                flag: 1
            };
            const name = req.body.name;
            const imageFile = req.files.image;
            const imageName = Math.floor(Math.random() * 1000000) + new Date().getTime() + imageFile.name;
            console.log(imageName)
            const desti = __dirname + "/public/images/products/" + imageName;
            imageFile.mv(desti, (err) => {
                status = 500;
                response = {
                    msg: "Internal server error",
                    flag: 0
                };
            })
            if (response.flag !== 0) {
                await Product({
                    name: name,
                    image: imageName
                }).save();
            }
            status = 200;
            response = {
                msg: "Product created",
                flag: 1
            };
            res.status(status).json(response);
        }
    )
    app.listen(5000)
} else {
    console.log("DB Issue");
}