require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Sheet = require("./models/Sheet");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const sheetsDir = path.join(__dirname, "sheets");
  const files = fs.readdirSync(sheetsDir).filter((f) => f.endsWith(".json"));

  if (files.length === 0) {
    console.log("No JSON files found in backend/sheets/");
    process.exit(0);
  }

  for (const file of files) {
    try {
      const raw = JSON.parse(
        fs.readFileSync(path.join(sheetsDir, file), "utf-8")
      );
      const sheetsArr = Array.isArray(raw.sheets) ? raw.sheets : [raw];

      for (const sheetObj of sheetsArr) {
        if (!sheetObj.id || !sheetObj.title) {
          console.warn(`  Skipped invalid entry in ${file}`);
          continue;
        }
        await Sheet.findOneAndUpdate({ id: sheetObj.id }, sheetObj, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });
        console.log(`  ✔ Seeded: ${sheetObj.title} (${sheetObj.id})`);
      }
    } catch (err) {
      console.error(`  ✘ Failed to process ${file}:`, err.message);
    }
  }

  await mongoose.disconnect();
  console.log("\nDone. All sheets seeded.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
