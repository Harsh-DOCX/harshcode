const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    profile: {
      name: String,
      headline: String,
      location: String,
      age: Number,
      degree: String,
      academicYear: String,
      graduated: Boolean,
      cgpa: String,
      graduationYear: Number,
      email: String,
      github: String,
      linkedin: String,
      summary: String,
      traits: [String],
    },
    skills: [{ name: String, category: String, level: Number }],
    tools: [{ name: String, note: String }],
    education: [
      {
        title: String,
        institution: String,
        year: String,
        result: String,
        status: String,
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        start: String,
        end: String,
        summary: String,
      },
    ],
    projects: [
      {
        slug: String,
        title: String,
        stack: String,
        status: String,
        summary: String,
        highlights: [String],
      },
    ],
    currentWork: [
      {
        slug: String,
        title: String,
        stack: String,
        summary: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
