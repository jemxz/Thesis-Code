const translate = require("google-translate-api-x");
const XLSX = require("xlsx");

// Load the Excel file
const workbook = XLSX.readFile("Before-Translation.xlsx");
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]];

// Read the data from the Excel file
let jsonData = XLSX.utils.sheet_to_json(worksheet);

// Function to translate a single row
async function translateRow(row) {
  try {
    // Ensure the text exists before attempting to translate
    const textToTranslate = row["Job Description In German"] || "";
    if (textToTranslate.trim() === "") {
      row["Job Description In English"] = "";
      return;
    }

    // Translate the "Job Description In German" column
    const res = await translate(textToTranslate, {
      from: "de",
      to: "en",
    });
    row["Job Description In English"] = res.text; // Add translation to a new column
    console.log(`Translated: ${textToTranslate} -> ${res.text}`);
  } catch (err) {
    console.error(`Error translating: ${err}`);
    row["Job Description In English"] = "Translation Error";
  }
}

// Translate each row
(async () => {
  for (let i = 0; i < jsonData.length; i++) {
    await translateRow(jsonData[i]);
  }

  // Create a new worksheet with the translations
  const newWorksheet = XLSX.utils.json_to_sheet(jsonData);

  // Add the new worksheet to a new workbook
  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Translated");

  // Save the translated workbook to a new Excel file
  XLSX.writeFile(newWorkbook, "Translated_Job_Descriptions.xlsx");
  console.log(
    'Translation complete. Saved as "Translated_Job_Descriptions.xlsx".'
  );
})();
