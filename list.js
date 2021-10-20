"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const _gm = require("gm");
const fs = require("fs");
const gm = _gm.subClass({ imageMagick: true });
function hasGpsData(filePath) {
    return new Promise((resolve) => {
        gm(filePath).identify("%[EXIF:*]", (err, exifData) => {
            if (err) {
                resolve(null);
            }
            else {
                const result = !!exifData?.toLocaleLowerCase()?.includes("gps");
                resolve(result);
            }
        });
    });
}
function getAllFiles(fromPath, fileList = []) {
    const fileNames = fs.readdirSync(fromPath);
    fileNames.forEach(function (fileName) {
        const filePath = path.join(fromPath, fileName);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getAllFiles(filePath, fileList);
        }
        else {
            fileList.push(filePath);
        }
    });
    return fileList;
}
async function list(fromPath, silent) {
    const allFiles = getAllFiles(fromPath);
    const size = allFiles.length;
    if (!silent)
        console.log(`Scanning ${size} files...`);
    for (let i = 0; i < size; i++) {
        const filePath = allFiles[i];
        const logName = filePath.replace(fromPath, "");
        const hasGps = await hasGpsData(filePath);
        if (hasGps === null) {
            if (!silent)
                console.log(`Failed to parse: ${logName}`);
        }
        else if (hasGps) {
            console.log(logName);
        }
        if (!silent && i % 500 === 0 && i !== 0) {
            console.log(`${i} files have been scanned...`);
        }
    }
    if (!silent)
        console.log(`Done!`);
}
module.exports = list;
