import { exec } from "child_process";
import { app } from "electron";
import path from "path";

const killProcess = require('kill-process-by-name');

export const servePocketBase = () => {
    const pbPath = path.join(app.getAppPath(), "resources", "pocketbase", "pocketbase.exe");
    const workingDir = path.join(app.getAppPath(), "resources", "pocketbase");

    const cmd = `cd ${workingDir} & pocketbase.exe serve`;

    console.log("Path ", pbPath);

    exec(cmd, { cwd: workingDir }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

export const stopPocketBase = () => {
    killProcess("pocketbase");
}