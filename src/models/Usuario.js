import mongoose from "mongoose";
const { Schema } = mongoose;

const usrSchema = new Schema ({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Usuario = mongoose.model("usuarios", usrSchema);

export default Usuario;