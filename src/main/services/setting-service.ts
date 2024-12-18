import { getPocketBaseInstance } from "../config/pocketbase";

export class SettingService {
    private _COLLECTION = 'settings';

    public async getSetting() {
        const pb = await getPocketBaseInstance();

        const config = await pb.collection(this._COLLECTION).getFullList();

        return config[0];
    }

    public async setSetting(key: string, value: any) {
        const pb = await getPocketBaseInstance();

        const config = await this.getSetting();

        pb.collection(this._COLLECTION).update(config.id, {
            [key]: value
        });
    }

    public async getSettingValue(key: string) {
        const pb = await getPocketBaseInstance();

        const config = await this.getSetting();

        const val = await pb.collection(this._COLLECTION).getOne(config.id);

        return val[key];
    }
}