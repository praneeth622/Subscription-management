const express = require("express");
const Guide = require("../models/guideModel");
const router = express.Router();

// Create a new guide
router.post("/create", async (req, res) => {
  const {
    guideName,
    creatorName,
    ownerEmail,
    visibility,
    bannerImage,
    type,
    steps,
  } = req.body;

  try {
    const guide = new Guide({
      guideName,
      creatorName,
      ownerEmail,
      visibility,
      bannerImage,
      type,
      steps,
    });
    await guide.save();
    res.json({ message: "Guide created successfully", guide });
  } catch (error) {
    console.error("Error creating guide:", error);
    res.status(500).json({ error: "Failed to create guide" });
  }
});

// Get all guides
router.get("/get-all", async (req, res) => {
  const { ownerEmail } = req.query;

  try {
    let guides;
    if (ownerEmail) {
      guides = await Guide.find({ ownerEmail });
    } else {
      guides = await Guide.find();
    }
    res.json(guides);
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).json({ error: "Failed to fetch guides" });
  }
});


// Get a single guide by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const guide = await Guide.findById(id);
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json(guide);
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).json({ error: "Failed to fetch guide" });
  }
});

// Update a guide by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const guide = await Guide.findByIdAndUpdate(id, updates, { new: true });
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json({ message: "Guide updated successfully", guide });
  } catch (error) {
    console.error("Error updating guide:", error);
    res.status(500).json({ error: "Failed to update guide" });
  }
});

// Delete a guide by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const guide = await Guide.findByIdAndDelete(id);
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json({ message: "Guide deleted successfully" });
  } catch (error) {
    console.error("Error deleting guide:", error);
    res.status(500).json({ error: "Failed to delete guide" });
  }
});

module.exports = router;
