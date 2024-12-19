import { exec } from "child_process";
import path from "path";
import { app } from "electron";

import fs from "fs";
import { is } from "@electron-toolkit/utils";

const killProcess = require('kill-process-by-name');

export const servePocketBase = () => {
    const basePath = is.dev 
        ? path.join(app.getAppPath(), "resources", "pocketbase") 
        : path.join(process.resourcesPath, "app.asar.unpacked", "resources", "pocketbase"); // Nota el uso de process.resourcesPath
    
    const pbPath = path.join(basePath, "pocketbase.exe");
    const workingDir = basePath;

    console.log("PB Path:", pbPath);
    console.log("Working Dir:", workingDir);

    const cmd = `cd ${basePath} & pocketbase.exe serve`;


    exec(cmd, { cwd: workingDir }, (error, stdout, stderr) => {
        if (error) {
            fs.writeFileSync(
                path.join("E:", "error_electron.txt"),
                `ERROR: ${JSON.stringify(error)}\n\n\nPB PATH: ${pbPath}\n\n\nWORKING DIR: ${workingDir}`
            );
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

// export const servePocketBase = () => {
//     const basePath = is.dev 
//         ? path.join(app.getAppPath(), "resources", "pocketbase") 
//         : path.join(process.resourcesPath, "app.asar.unpacked", "pocketbase"); // Nota el uso de process.resourcesPath
    
//     const pbPath = path.join(basePath, "pocketbase.exe");
//     const workingDir = basePath;

//     console.log("PB Path:", pbPath);
//     console.log("Working Dir:", workingDir);

//     const p = spawn(pbPath, ["serve"], { cwd: workingDir });

//     p.stdout.on("data", (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     p.stderr.on("data", (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     p.on("error", (error) => {
//         console.error(`Spawn Error: ${error.message}`);
//         fs.writeFileSync(
//             path.join("E:", "error_electron.txt"),
//             `ERROR: ${JSON.stringify(error)}\nPB PATH: ${pbPath}\nWORKING DIR: ${workingDir}`
//         );
//     });

//     p.on("close", (code) => {
//         console.log(`PocketBase process exited with code ${code}`);
//     });
// };

export const stopPocketBase = () => {
    killProcess("pocketbase");
}