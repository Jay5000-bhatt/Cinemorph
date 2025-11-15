import dotenv from "dotenv";
dotenv.config({ quiet: true });

import mongoose from "mongoose";

const connect = mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);

export default connect;