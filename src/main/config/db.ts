import { is } from "@electron-toolkit/utils";
import { app } from "electron";
import path from "path";

import Database from "better-sqlite3";

const dbPath = is.dev
    ? path.join(app.getAppPath(), "resources", "ytp.sqlite")
    : path.join(process.resourcesPath, "app.asar.unpacked", "resources", "ytp.sqlite");


const db = new Database(dbPath);

db.exec(`CREATE TABLE IF NOT EXISTS "settings" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    yt_limit INTEGER,
    pendrive_path TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS "history" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "url" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "thumbnail" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "reason" TEXT,
        "time" TEXT NOT NULL,
        "outputDir" TEXT NOT NULL
    )`
)

db.exec(`CREATE TABLE IF NOT EXISTS "errors" (
    "error" TEXT NOT NULL
  )`
)

const settings = db.prepare("SELECT * FROM settings").all();

if (!settings.length) {
    console.log("Inserting default settings");
    db.prepare("DELETE FROM errors").run();
    db.prepare("DELETE FROM history").run();
    db.prepare("INSERT INTO settings (yt_limit, pendrive_path) VALUES (20, '')").run();
}

export default db;
