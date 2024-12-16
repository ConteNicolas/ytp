import { app } from "electron";
import path from "path";


import fs from "fs";

export class SettingService {
    private _path = path.join(app.getAppPath(), '/resources/config.json');

    public getSetting() {
        if (!fs.existsSync(this._path)) {
            throw new Error('Config file not found.');
        }
        
        try {
            const config = JSON.parse(fs.readFileSync(this._path, 'utf8'));
            return config;
        }
        catch (error) {
            throw new Error('Error parsing config file.');
        }
    }

    public saveSetting(config: any) {
        try {
            fs.writeFileSync(this._path, JSON.stringify(config, null, 2));
        } catch (error) {
            throw new Error('Error saving config file.');
        }
    }

    public setSetting(key: string, value: any) {
        const config = this.getSetting();

        config[key] = value;

        this.saveSetting(config);
    }

    public getSettingValue(key: string): any | undefined {
        const config = this.getSetting();

        return config[key] ?? undefined;
    }
}