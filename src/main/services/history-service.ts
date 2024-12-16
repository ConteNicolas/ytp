import { SettingService } from "./setting-service";

export class HistoryService {
    private _settingService = new SettingService();

    public getHistory(): any[] {
        return this._settingService.getSettingValue('history');
    }

    public addToHistory(item: any) {
        const history = this.getHistory();

        history.push(item);

        this._settingService.setSetting('history', history);
    }

    public alreadyDownloaded(url: string, title: string) {
        const history = this.getHistory();

        return history.find((i) => i.url === url && i.title === title);
    }

    public updateHistory(updatedItem: any) {
        const history = this.getHistory();
    
        const index = history.findIndex((i) => i.id === updatedItem.id);
        if (index !== -1) {
            history[index] = updatedItem;
        } else {
            history.push(updatedItem);
        }
    
        this._settingService.setSetting('history', history);
    }
}