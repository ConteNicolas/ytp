import db from "../config/db";

export class SettingService {
    public async getSetting() {
        const config = await db.prepare('SELECT * FROM settings').get();

        return config;
    }

    public async setSetting(key: string, value: any) {
        await db.prepare(`UPDATE settings SET ${key} = ?`).run(value);  
    }

    public async getSettingValue(key: string) {
        console.log(db);
        const setting = await db.prepare('SELECT * FROM settings').get();
        
        console.log(setting);

        return setting[key];
    }
}