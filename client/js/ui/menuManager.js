// ========================================================
// Quản Lý Màn Hình Menu & Cài Đặt (Menu Manager)
// ========================================================

class MenuManager {
    constructor() {
        this.isInMainMenu = true;
        this.currentModal = null; // 'save_load', 'settings', 'about', 'online'
        this.onStartGame = null;
        this.onLoadGame = null;
        this.onSaveGame = null;

        this.initDOM();
    }

    initDOM() {
        // Gắn sự kiện các nút Menu chính
        document.getElementById('btn-menu-play')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideMainMenu();
            if (this.onStartGame) this.onStartGame();
        });

        document.getElementById('btn-menu-save')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showSaveLoadModal();
        });

        document.getElementById('btn-menu-settings')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showSettingsModal();
        });

        document.getElementById('btn-menu-about')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showAboutModal();
        });

        document.getElementById('btn-menu-online')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showOnlineModal();
        });

        // Nút Menu trên Header game
        document.getElementById('btn-in-game-menu')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showMainMenu();
        });
    }

    showMainMenu() {
        this.isInMainMenu = true;
        const menuOverlay = document.getElementById('main-menu-overlay');
        if (menuOverlay) menuOverlay.style.display = 'flex';
    }

    hideMainMenu() {
        this.isInMainMenu = false;
        const menuOverlay = document.getElementById('main-menu-overlay');
        if (menuOverlay) menuOverlay.style.display = 'none';
    }

    closeModal() {
        const modal = document.getElementById('app-modal');
        if (modal) modal.style.display = 'none';
        this.currentModal = null;
    }

    showModal(title, contentHtml) {
        const modal = document.getElementById('app-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        if (modal && modalTitle && modalBody) {
            modalTitle.innerHTML = title;
            modalBody.innerHTML = contentHtml;
            modal.style.display = 'flex';
        }
    }

    // Modal Lưu & Tải game
    async showSaveLoadModal() {
        this.currentModal = 'save_load';
        this.showModal('💾 LƯU & TẢI GAME (SEQUELIZE MYSQL)', '<div class="loading-spinner">Đang tải dữ liệu bản lưu...</div>');

        const saves = await window.GameAPI.listSaves();
        const serverStatus = await window.GameAPI.getStatus();

        let slotsHtml = `
            <div class="db-status-bar ${serverStatus.isDbConnected ? 'connected' : 'offline'}">
                <span>Trạng thái: <strong>${serverStatus.database}</strong></span>
            </div>
            <div class="save-slots-container">
        `;

        for (let slot = 1; slot <= 3; slot++) {
            const save = saves.find(s => s.slot === slot);
            slotsHtml += `
                <div class="save-slot-card ${save ? 'occupied' : 'empty'}">
                    <div class="slot-header">
                        <span class="slot-badge">SLOT ${slot}</span>
                        <span class="slot-time">${save ? new Date(save.updatedAt).toLocaleString('vi-VN') : 'Trống'}</span>
                    </div>
                    <div class="slot-info">
                        <strong>${save ? (save.saveName || `Bản lưu ${slot}`) : 'Chưa có dữ liệu'}</strong>
                        <p>${save ? `Khu vực: ${save.mapId || 'Pellet Town'}` : 'Nhấn [Lưu vào đây] để tạo bản lưu mới.'}</p>
                    </div>
                    <div class="slot-actions">
                        ${save ? `<button class="btn-action btn-load" onclick="window.menuManager.executeLoad(${slot})">📂 Tải Game</button>` : ''}
                        <button class="btn-action btn-save" onclick="window.menuManager.executeSave(${slot})">💾 Lưu Đè</button>
                    </div>
                </div>
            `;
        }

        slotsHtml += '</div>';
        this.showModal('💾 LƯU & TẢI GAME (SEQUELIZE MYSQL)', slotsHtml);
    }

    async executeSave(slot) {
        window.soundEngine?.playMenuClick();
        if (this.onSaveGame) {
            const success = await this.onSaveGame(slot);
            if (success) {
                alert(`✅ Đã lưu tiến trình vào Slot ${slot} thành công!`);
                this.showSaveLoadModal();
            }
        }
    }

    async executeLoad(slot) {
        window.soundEngine?.playMenuClick();
        if (this.onLoadGame) {
            const success = await this.onLoadGame(slot);
            if (success) {
                this.closeModal();
                this.hideMainMenu();
            }
        }
    }

    // Modal Cài đặt
    showSettingsModal() {
        this.currentModal = 'settings';
        const html = `
            <div class="settings-form">
                <div class="setting-item">
                    <label>🔊 Hiệu Ứng Âm Thanh 8-Bit:</label>
                    <button class="btn-action ${window.soundEngine?.muted ? '' : 'active'}" id="btn-toggle-sound" onclick="window.menuManager.toggleSound(this)">
                        ${window.soundEngine?.muted ? 'Đang TẮT' : 'Đang BẬT'}
                    </button>
                </div>
                <div class="setting-item">
                    <label>🛠️ Xem Vùng Va Chạm & Cỏ (Debug):</label>
                    <button class="btn-action" id="btn-toggle-debug" onclick="window.gameEngine?.toggleDebug(); this.classList.toggle('active');">
                        Chuyển Đổi (Phím B)
                    </button>
                </div>
                <div class="setting-item">
                    <label>⚡ Tốc Độ Chạy:</label>
                    <span>Giữ phím <strong>Shift</strong> khi di chuyển</span>
                </div>
            </div>
        `;
        this.showModal('⚙️ CÀI ĐẶT TRÒ CHƠI', html);
    }

    toggleSound(btn) {
        const isMuted = window.soundEngine?.toggleMute();
        btn.textContent = isMuted ? 'Đang TẮT' : 'Đang BẬT';
        btn.classList.toggle('active', !isMuted);
    }

    // Modal Giới thiệu
    showAboutModal() {
        this.currentModal = 'about';
        const html = `
            <div class="about-content">
                <h3>🔴 ANIMON: VƯƠNG QUỐC SỦNG VẬT</h3>
                <p>Trò chơi RPG khám phá thế giới sủng vật phong cách Pokémon kinh điển được xây dựng hoàn toàn trên nền tảng <strong>HTML5 Canvas</strong> và <strong>Node.js Sequelize MySQL</strong>.</p>
                
                <h4>🕹️ Hướng Dẫn Điều Khiển:</h4>
                <ul>
                    <li><strong>W / A / S / D</strong> hoặc <strong>Mũi Tên:</strong> Di chuyển nhân vật 4 hướng</li>
                    <li><strong>Shift:</strong> Chạy nhanh (Giày trượt)</li>
                    <li><strong>Phím B:</strong> Bật / Tắt xem hộp ranh giới va chạm (Debug mode)</li>
                    <li><strong>Phím M:</strong> Bật / Tắt âm thanh</li>
                    <li><strong>Phím R:</strong> Đặt lại vị trí ban đầu</li>
                </ul>

                <h4>🌟 Tính Năng Nổi Bật:</h4>
                <ul>
                    <li>Bản đồ liên kết đa tầng qua các cổng dịch chuyển (Portals).</li>
                    <li>Hệ thống chiến đấu theo lượt: Đánh, Bắt sủng vật, Túi đồ, Chạy trốn.</li>
                    <li>Lưu trữ game trực tiếp vào MySQL database qua Sequelize ORM.</li>
                </ul>
            </div>
        `;
        this.showModal('📜 GIỚI THIỆU TRÒ CHƠI', html);
    }

    // Modal Chơi Online
    showOnlineModal() {
        this.currentModal = 'online';
        const html = `
            <div class="online-content" style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 12px;">🌐</div>
                <h3 style="color: #f1c40f; margin-bottom: 8px;">TÍNH NĂNG CHƠI ONLINE</h3>
                <p style="color: #bdc3c7; line-height: 1.6;">
                    Hệ thống Đấu trường Trực tuyến (PvP Arena), Đổi sủng vật (Trading) và Bảng xếp hạng Huấn Luyện Viên đang được chuẩn bị để tích hợp vào máy chủ WebSocket ở các phiên bản tiếp theo!
                </p>
                <div style="margin-top: 18px; padding: 10px; background: rgba(241, 196, 15, 0.1); border-radius: 8px; border: 1px solid #f1c40f; color: #f1c40f;">
                    🚀 <em>Dự kiến ra mắt trong phiên bản sắp tới.</em>
                </div>
            </div>
        `;
        this.showModal('🌐 CHƠI ONLINE (COMING SOON)', html);
    }
}

window.menuManager = new MenuManager();

