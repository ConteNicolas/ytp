import { SettingService } from "./setting-service";

export class HistoryService {
    private _settingService = new SettingService();

    public async getHistory(): Promise<any[]> {
        return await this._settingService.getSettingValue('history');
    }

    public async addToHistory(item: any) {
        const history = await this.getHistory();

        history.push(item);

        await this._settingService.setSetting('history', history);
    }

    public async alreadyDownloaded(url: string, title: string) {
        const history = await this.getHistory();

        return history.find((i) => i.url === url && i.title === title);
    }

    public async updateHistory(updatedItem: any) {
        const history = await this.getHistory();
    
        const index = history.findIndex((i) => i.id === updatedItem.id);
        if (index !== -1) {
            history[index] = updatedItem;
        } else {
            history.push(updatedItem);
        }
    
        await this._settingService.setSetting('history', history);
    }

    public async updateStatusByName(name: string, status: string) {
        const history = await this.getHistory();

        const index = history.findIndex((i) => i.title === name);
        if (index !== -1) {
            history[index].status = status;
        } else {
            throw new Error('No se encontro la cancion en el historial.');
        }
    
        await this._settingService.setSetting('history', history);
    }

    public async clearHistory() {
        await this._settingService.setSetting('history', []);
    }

    public async removeHistoryItem(id: string) {
        const history = await this.getHistory();

        const index = history.findIndex((i) => i.id === id);
        if (index !== -1) {
            history.splice(index, 1);
        } else {
            throw new Error('No se encontro el elemento en el historial.');
        }
    
        await this._settingService.setSetting('history', history);
    }
}