const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "data");
const outputDirectory = path.join(__dirname, "updated_micr");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const updateMICRData = async () => {
  const files = fs.readdirSync(dataDirectory);

  files.forEach((file) => {
    const filePath = path.join(dataDirectory, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let micrCodes = [];

    Object.keys(fileData).forEach((key) => {
      const record = fileData[key];
      const micr = record.MICR || null;
      const ifsc = record.IFSC || null;

      if (micr && ifsc) {
        micrCodes.push([micr, ifsc]);
      }
    });

    const updatedData = {
      micrCodes: micrCodes,
    };

    const updatedFilePath = path.join(outputDirectory, file);

    fs.writeFileSync(updatedFilePath, JSON.stringify(updatedData), "utf-8");

    console.log(`Updated file created: ${file}`);
  });

  console.log(`All files have been updated in the 'updated_micr' folder.`);
};

updateMICRData();
