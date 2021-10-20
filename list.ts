import * as path from "path";
import * as _gm from "gm";
import * as fs from "fs";
const gm = _gm.subClass({ imageMagick: true });

function hasGpsData(filePath: string): Promise<boolean | null> {
  return new Promise((resolve) => {
    gm(filePath).identify("%[EXIF:*]", (err, exifData) => {
      if (err) {
        resolve(null);
      } else {
        const result = !!exifData?.toLocaleLowerCase()?.includes("gps");
        resolve(result);
      }
    });
  });
}

function getAllFiles(fromPath: string, fileList: string[] = []): string[] {
  const fileNames = fs.readdirSync(fromPath);

  fileNames.forEach(function (fileName) {
    const filePath = path.join(fromPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function list(fromPath: string, silent?: true) {
  const allFiles = getAllFiles(fromPath);
  const size = allFiles.length;
  if (!silent) console.log(`Scanning ${size} files...`);

  for (let i = 0; i < size; i++) {
    const filePath = allFiles[i];
    const logName = filePath.replace(fromPath, "");

    const hasGps = await hasGpsData(filePath);
    if (hasGps === null) {
      if (!silent) console.log(`Failed to parse: ${logName}`);
    } else if (hasGps) {
      console.log(logName);
    }
    if (!silent && i % 500 === 0 && i !== 0) {
      console.log(`${i} files have been scanned...`);
    }
  }

  if (!silent) console.log(`Done!`);
}

module.exports = list;
