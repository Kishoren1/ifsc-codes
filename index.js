const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "data");
const outputDirectory = path.join(__dirname, "updated_data");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const minifyIFSCs = async () => {
  const files = fs.readdirSync(dataDirectory);

  files.forEach((file) => {
    const filePath = path.join(dataDirectory, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let ifscCodes = [];
    Object.keys(fileData).forEach((key) => {
      ifscCodes.push(fileData[key].IFSC);
    });

    const updatedData = { ifscCodes };

    const minifiedJson = JSON.stringify(updatedData);

    const updatedFilePath = path.join(outputDirectory, file);
    fs.writeFileSync(updatedFilePath, minifiedJson, "utf-8");

    console.log(`Minified file created: ${file}`);
  });

  console.log(`All files have been minified in the 'updated_data' folder.`);
};

minifyIFSCs();
