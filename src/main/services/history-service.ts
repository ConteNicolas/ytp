import db from "../config/db";

export class HistoryService {
    public async getHistory(): Promise<any[]> {
        return await db.prepare('SELECT * FROM history').all();
    }

    public async addToHistory(item: any) {
        await db.prepare('INSERT INTO history (url, title, thumbnail, status, reason, time, outputDir) VALUES (?, ?, ?, ?, ?, ?, ?)').run(item.url, item.title, item.thumbnail, item.status, item.reason, item.time, item.outputDir);
    }

    public async alreadyDownloaded(url: string, title: string) {
        const alreadyDownloaded = await db.prepare('SELECT * FROM history WHERE url = ? AND title = ?').get(url, title);

        return alreadyDownloaded || (alreadyDownloaded && Object.keys(alreadyDownloaded).length > 0);
    }

    public async updateHistory(updatedItem: any) {
        const history = await db.prepare('SELECT * FROM history where id = ?').run(updatedItem.id);

        if (history) {
            await db.prepare('UPDATE history SET url = ?, title = ?, thumbnail = ?, status = ?, reason = ?, time = ?, outputDir = ? WHERE id = ?').run(updatedItem.url, updatedItem.title, updatedItem.thumbnail, updatedItem.status, updatedItem.reason, updatedItem.time, updatedItem.outputDir, updatedItem.id);
        } else {
            await db.prepare('INSERT INTO history (url, title, thumbnail, status, reason, time, outputDir) VALUES (?, ?, ?, ?, ?, ?, ?)').run(updatedItem.url, updatedItem.title, updatedItem.thumbnail, updatedItem.status, updatedItem.reason, updatedItem.time, updatedItem.outputDir);
        }
    }

    public async updateStatusByName(name: string, status: string) {
        await db.prepare('UPDATE history SET status = ? WHERE title = ?').run(status, name);
    }

    public async clearHistory() {
        await db.prepare('DELETE FROM history').run();
    }

    public async removeHistoryItem(id: string) {
        await db.prepare('DELETE FROM history WHERE id = ?').run(id);
    }
}