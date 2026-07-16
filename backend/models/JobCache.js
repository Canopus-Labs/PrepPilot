const mongoose = require("mongoose");

const JobCacheSchema = new mongoose.Schema({
  cacheKey: { type: String, required: true, unique: true },
  jobs: [
    {
      id: String,
      title: String,
      company: String,
      location: String,
      salary_min: Number,
      salary_max: Number,
      description: String,
      redirect_url: String,
      created: String,
    },
  ],
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobCache", JobCacheSchema);
