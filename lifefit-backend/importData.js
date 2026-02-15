import fs from "fs";
import csv from "csv-parser";
import { pool } from "./config/db.js";

   // make sure db.js exports default

async function importCSV() {
  try {
    await pool.query("TRUNCATE TABLE cities RESTART IDENTITY;");
    console.log("Old data deleted...");

    const stream = fs.createReadStream("cost-of-living_v2.csv")
      .pipe(csv());

    for await (const row of stream) {

      const groceryIndex =
        (
          Number(row.x9 || 0) +
          Number(row.x10 || 0) +
          Number(row.x11 || 0) +
          Number(row.x12 || 0) +
          Number(row.x14 || 0) +
          Number(row.x16 || 0) +
          Number(row.x17 || 0) +
          Number(row.x18 || 0) +
          Number(row.x19 || 0) +
          Number(row.x20 || 0) +
          Number(row.x21 || 0)
        ) / 11;

      const transportIndex =
        (Number(row.x29 || 0) + Number(row.x33 || 0)) / 2;

      await pool.query(
        `INSERT INTO cities
        (city, country,
         rent_1_center, rent_1_outside,
         rent_3_center, rent_3_outside,
         utilities, internet,
         grocery_index, transport_index,
         avg_salary, mortgage_rate, data_quality)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          row.city,
          row.country,

          Number(row.x48 || 0),
          Number(row.x49 || 0),

          Number(row.x50 || 0),
          Number(row.x51 || 0),

          Number(row.x36 || 0),
          Number(row.x38 || 0),

          groceryIndex,
          transportIndex,

          Number(row.x54 || 0),
          Number(row.x55 || 0),
          Number(row.data_quality || 0)
        ]
      );
    }

    console.log("CSV Import Complete");
    process.exit();

  } catch (err) {
    console.error("Import error:", err);
  }
}

importCSV();
