import { Scan } from "../types/scan";

let scans: Scan[] = [];

export const scanRepository = {
    saveScan: async (scan: Scan): Promise<Scan> => {
        scans.push(scan);
        return scan;
    },

    findByUserId: async (userId: string): Promise<Scan[]> => {
        return scans.filter(s => s.userId === userId);
    },

    findByUserIds: async (userIds: string[]): Promise<Scan[]> => {
        return scans.filter(s => userIds.includes(s.userId));
    }
};
