const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  text: { type: String, required: true },
  fileUrl: { type: String, required: true },
  timestamp: {
    from: { type: Number, required: true },
    to: { type: Number, required: true },
  },
});

const guideSchema = new mongoose.Schema({
  guideName: { type: String, required: true },
  creatorName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  visibility: { type: String, enum: ["public", "private"], required: true },
  bannerImage: { type: String, required: true },
  type: {
    type: String,
    enum: ["origami", "drawing", "wall-painting"],
    required: true,
  },
  steps: [stepSchema],
  createdAt: { type: Date, default: Date.now },
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
