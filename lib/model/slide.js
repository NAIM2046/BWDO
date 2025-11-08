
const { Schema, model, models } = require("mongoose");


const slideSchema = new Schema({
    number: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
});

const Slide = models.Slide || model("Slide", slideSchema);

module.exports = Slide;
