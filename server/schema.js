const { Schema, model, Types } = require("mongoose");

// Schema for options within each category
const optionSchema = new Schema({
  optionId: { type: String, required: true, unique: true },
  label: { type: String, required: true }, // e.g., "1. Staff Details"
  type: { type: String, enum: ["text", "download"], default: "text" }, // "text" or "download"
  url: { type: String, default: null }, // Optional, for file download links
  content: { type: String, default: null }, // Optional, for textual content
  fileId: { type: Types.ObjectId, ref: "uploads", default: null }, // GridFS File ID reference
});

// Schema for each help category
const helpCategorySchema = new Schema({
  category: { type: String, unique: true, required: true }, // e.g., "hi", "check order status"
  text: { type: String, required: true }, // e.g., "How can I assist you?"
  options: [{ type: Types.ObjectId, ref: "Option" }], // Reference to Option documents
});

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AnnouncementSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const HelpCategory = model("HelpCategory", helpCategorySchema);
const Option = model("Option", optionSchema);
const Admin = model("Admin", adminSchema, "admin");
const Announcement = model("Announcement", AnnouncementSchema, "announcement");

module.exports = { HelpCategory, Option, Admin, Announcement };
