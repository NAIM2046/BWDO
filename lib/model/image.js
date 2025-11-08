import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true } // single image per document
}, { timestamps: true });

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);
export default Image;
