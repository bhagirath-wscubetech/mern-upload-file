import mongoose from "mongoose";


async function dbConnect() {
    let res;
    await mongoose.connect(
        process.env.DB
    ).then(
        () => {
            res = true;
        }
    ).catch(
        () => {
            res = false;
        }
    )
    return res;
}

export { dbConnect }