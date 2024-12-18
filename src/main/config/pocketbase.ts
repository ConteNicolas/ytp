const BASE_URL = 'http://127.0.0.1:8090';


let pocketBaseInstance;

export const getPocketBaseInstance = async () => {
    if (!pocketBaseInstance) {
        console.log("Si veo este console.log mas de una vez, que se vayan todos a la concha de su madre");
        const { default: PocketBase } = await import('pocketbase');
        pocketBaseInstance = new PocketBase(BASE_URL);
        pocketBaseInstance.autoCancellation(false);
    }

    return pocketBaseInstance;
};

