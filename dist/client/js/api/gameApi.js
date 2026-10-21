// ========================================================
// Game API Service (Sequelize Backend + LocalStorage Fallback)
// ========================================================

const GameAPI = {
    baseUrl: '/api',

    // Kiểm tra trạng thái máy chủ
    async getStatus() {
        try {
            const res = await fetch(`${this.baseUrl}/status`);
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.warn('Backend không phản hồi, chuyển sang chế độ Offline LocalStorage:', e.message);
        }
        return { server: 'offline', database: 'LocalStorage', isDbConnected: false };
    },

    // Lấy danh sách quái vật
    async getMonsters() {
        try {
            const res = await fetch(`${this.baseUrl}/monsters`);
            if (res.ok) {
                const data = await res.json();
                if (data.data && data.data.length > 0) return data.data;
            }
        } catch (_) {}
        return window.MONSTERS_PRESET || [];
    },

    // Lưu game
    async saveGame(slot, payload) {
        try {
            const res = await fetch(`${this.baseUrl}/saves`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot, ...payload })
            });
            if (res.ok) {
                const result = await res.json();
                // Đồng thời đồng bộ lưu vào localStorage để luôn có backup
                localStorage.setItem(`animon_save_slot_${slot}`, JSON.stringify(payload));
                return result;
            }
        } catch (e) {
            console.warn('Lỗi gọi API lưu game, lưu vào localStorage:', e);
        }

        // Fallback localStorage
        localStorage.setItem(`animon_save_slot_${slot}`, JSON.stringify(payload));
        return { success: true, message: 'Đã lưu game vào LocalStorage (Offline Mode)', data: payload };
    },

    // Tải game
    async loadGame(slot) {
        try {
            const res = await fetch(`${this.baseUrl}/saves/${slot}`);
            if (res.ok) {
                const result = await res.json();
                if (result.success && result.data) return result.data;
            }
        } catch (_) {}

        // Fallback localStorage
        const local = localStorage.getItem(`animon_save_slot_${slot}`);
        if (local) {
            return JSON.parse(local);
        }
        return null;
    },

    // Danh sách các bản lưu
    async listSaves() {
        try {
            const res = await fetch(`${this.baseUrl}/saves`);
            if (res.ok) {
                const result = await res.json();
                if (result.data) return result.data;
            }
        } catch (_) {}

        // Fallback localStorage
        const list = [];
        for (let i = 1; i <= 3; i++) {
            const item = localStorage.getItem(`animon_save_slot_${i}`);
            if (item) {
                const parsed = JSON.parse(item);
                list.push({
                    slot: i,
                    saveName: parsed.saveName || `Bản lưu ${i}`,
                    mapId: parsed.mapId || 'pelletTown',
                    playtime: parsed.playtime || 0,
                    updatedAt: parsed.updatedAt || new Date().toISOString()
                });
            }
        }
        return list;
    }
};

window.GameAPI = GameAPI;

