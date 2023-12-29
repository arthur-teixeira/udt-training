import AppDataSource from "./dataSource";

export default async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
}

