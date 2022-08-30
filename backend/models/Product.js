import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

export default mongoose.model("Product", Product)