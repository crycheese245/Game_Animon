// ========================================================
// Quản Lý Màn Hình Menu & Cài Đặt (Menu Manager)
// ========================================================

class MenuManager {
    constructor() {
        this.isInMainMenu = true;
        this.isInGameMenu = false;
        this.currentModal = null; // 'save_load', 'settings', 'about', 'online', 'char_creation', 'bag', 'pet_team'
        this.onStartGame = null;
        this.onNewGame = null;
        this.onLoadGame = null;
        this.onSaveGame = null;

        // Trạng thái tạo nhân vật
        this.creationGender = 'male';
        this.creationStarter = 'cauvong_pet_1';

        this.initDOM();
        this.initCharacterCreationDOM();
    }

    initDOM() {
        // --- 1. CÁC NÚT MÀN HÌNH CHÍNH (TITLE SCREEN - CHỈ 4 MỤC) ---
        // Nút Chơi Mới -> Mở màn hình tạo nhân vật
        document.getElementById('btn-menu-newgame')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showCharacterCreation();
        });

        // Nút Tiếp Tục -> Bắt đầu hoặc tiếp tục chơi
        document.getElementById('btn-menu-play')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideMainMenu();
            if (this.onStartGame) this.onStartGame();
        });

        // Nút Cài Đặt trên màn hình chính
        document.getElementById('btn-menu-settings')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showSettingsModal();
        });

        // Nút Giới Thiệu trên màn hình chính
        document.getElementById('btn-menu-about')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showAboutModal();
        });

        // --- 2. CÁC NÚT TRONG MENU TRÒ CHƠI (IN-GAME PAUSE MENU) ---
        // Sủng vật trong game
        document.getElementById('btn-ingame-pets')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showPetTeamModal();
        });

        // Túi đồ trong game
        document.getElementById('btn-ingame-bag')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showBagModal();
        });

        // Cửa hàng vương quốc trong game
        document.getElementById('btn-ingame-shop')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showShopModal();
        });

        // Sủng vật đồ giám trong game
        document.getElementById('btn-ingame-pokedex')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showPokedexModal();
        });

        // Nhiệm vụ cốt truyện trong game
        document.getElementById('btn-ingame-quests')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showQuestModal();
        });

        // Lò ấp trứng trong game
        document.getElementById('btn-ingame-incubator')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showIncubatorModal();
        });

        // Kho sủng vật trong game
        document.getElementById('btn-ingame-box')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showStorageBoxModal();
        });

        // Đấu trường Boss trong game
        document.getElementById('btn-ingame-arena')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showBossArenaModal();
        });

        // Lưu & Tải trong game
        document.getElementById('btn-ingame-save')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showSaveLoadModal();
        });

        // Cài đặt trong game
        document.getElementById('btn-ingame-settings')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
            this.showSettingsModal();
        });

        // Về màn hình chính từ in-game
        document.getElementById('btn-ingame-title')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            if (confirm('Bạn có chắc chắn muốn quay về Màn hình chính không? Đừng quên lưu game trước khi thoát!')) {
                this.returnToTitleScreen();
            }
        });

        // Tiếp tục chơi / Đóng in-game menu
        document.getElementById('btn-ingame-resume')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
        });
        document.getElementById('btn-ingame-close')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideInGameMenu();
        });
    }

    initCharacterCreationDOM() {
        // 1. Chọn giới tính
        const maleCard = document.getElementById('gender-male');
        const femaleCard = document.getElementById('gender-female');
        const nameInput = document.getElementById('input-player-name');

        maleCard?.addEventListener('click', () => {
            window.soundEngine?.playMenuSelect();
            this.creationGender = 'male';
            maleCard.classList.add('active');
            femaleCard?.classList.remove('active');
            if (nameInput && (nameInput.value === 'Leaf' || nameInput.value === '')) {
                nameInput.value = 'Red';
            }
        });

        femaleCard?.addEventListener('click', () => {
            window.soundEngine?.playMenuSelect();
            this.creationGender = 'female';
            femaleCard.classList.add('active');
            maleCard?.classList.remove('active');
            if (nameInput && (nameInput.value === 'Red' || nameInput.value === '')) {
                nameInput.value = 'Leaf';
            }
        });

        // 2. Nút ngẫu nhiên tên
        const randomBtn = document.getElementById('btn-random-name');
        const randomNamesMale = ['Red', 'Ash', 'Gary', 'Lucas', 'Ethan', 'Phong', 'Lâm', 'Hải', 'Khang', 'Long'];
        const randomNamesFemale = ['Leaf', 'Dawn', 'May', 'Serena', 'Iris', 'Vy', 'Nhi', 'Hương', 'Linh', 'Mai'];

        randomBtn?.addEventListener('click', () => {
            window.soundEngine?.playMenuSelect();
            const pool = this.creationGender === 'female' ? randomNamesFemale : randomNamesMale;
            const chosen = pool[Math.floor(Math.random() * pool.length)];
            if (nameInput) nameInput.value = chosen;
        });

        // 3. Chọn Sủng vật khởi đầu
        const starterCards = document.querySelectorAll('.starter-card');
        starterCards.forEach(card => {
            card.addEventListener('click', () => {
                window.soundEngine?.playMenuSelect();
                starterCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.creationStarter = card.dataset.starter || 'cauvong_pet_1';
            });
        });

        // 4. Nút Hủy / Quay lại
        document.getElementById('btn-creation-cancel')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.hideCharacterCreation();
            this.showMainMenu();
        });

        // 5. Nút Xác nhận Bắt đầu hành trình
        document.getElementById('btn-creation-confirm')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            const name = (nameInput?.value || '').trim() || (this.creationGender === 'female' ? 'Leaf' : 'Red');

            this.hideCharacterCreation();
            this.hideMainMenu();

            if (this.onNewGame) {
                this.onNewGame({
                    gender: this.creationGender,
                    name: name,
                    starterCode: this.creationStarter
                });
            }
        });
    }

    showCharacterCreation() {
        const charOverlay = document.getElementById('char-creation-overlay');
        const menuOverlay = document.getElementById('main-menu-overlay');
        if (menuOverlay) menuOverlay.style.display = 'none';
        if (charOverlay) charOverlay.style.display = 'flex';
        this.currentModal = 'char_creation';
        this.renderStarterCanvases();
    }

    renderStarterCanvases() {
        setTimeout(() => {
            const starterCanvases = document.querySelectorAll('.starter-avatar-canvas');
            starterCanvases.forEach(cv => {
                const key = cv.dataset.sprite || 'npc2_1';
                window.J2MESprite?.renderMonsterAvatar(cv, key, { padRatio: 0.85 });
            });
        }, 30);
    }

    hideCharacterCreation() {
        const charOverlay = document.getElementById('char-creation-overlay');
        if (charOverlay) charOverlay.style.display = 'none';
        this.currentModal = null;
    }

    showMainMenu() {
        this.isInMainMenu = true;
        this.isInGameMenu = false;
        this.hideCharacterCreation();
        this.hideInGameMenu();
        const menuOverlay = document.getElementById('main-menu-overlay');
        if (menuOverlay) menuOverlay.style.display = 'flex';
    }

    hideMainMenu() {
        this.isInMainMenu = false;
        const menuOverlay = document.getElementById('main-menu-overlay');
        if (menuOverlay) menuOverlay.style.display = 'none';
    }

    showInGameMenu() {
        if (this.isInMainMenu) return;
        this.isInGameMenu = true;
        const ingameOverlay = document.getElementById('ingame-menu-overlay');
        const nameEl = document.getElementById('ingame-player-name');
        const goldEl = document.getElementById('ingame-player-gold');
        const avatarEl = document.getElementById('ingame-player-avatar');

        if (nameEl) nameEl.textContent = window.gameState?.playerName || 'Red';
        if (goldEl) goldEl.textContent = `💰 ${(window.gameState?.inventory?.gold || 0).toLocaleString('vi-VN')} Vàng`;
        if (avatarEl && window.gameState?.playerAvatar) {
            avatarEl.src = window.gameState.playerAvatar;
        }

        if (ingameOverlay) ingameOverlay.style.display = 'flex';
    }

    hideInGameMenu() {
        this.isInGameMenu = false;
        const ingameOverlay = document.getElementById('ingame-menu-overlay');
        if (ingameOverlay) ingameOverlay.style.display = 'none';
    }

    toggleInGameMenu() {
        if (this.isInMainMenu) return;
        if (this.currentModal) {
            this.closeModal();
            return;
        }
        if (this.isInGameMenu) {
            this.hideInGameMenu();
        } else {
            this.showInGameMenu();
        }
    }

    returnToTitleScreen() {
        this.hideInGameMenu();
        this.closeModal();
        this.showMainMenu();
    }

    closeModal() {
        if (this.petAnimInterval) {
            clearInterval(this.petAnimInterval);
            this.petAnimInterval = null;
        }
        const modal = document.getElementById('app-modal');
        if (modal) {
            modal.style.display = 'none';
            const win = modal.querySelector('.modal-window');
            if (win) win.classList.remove('large');
        }
        this.currentModal = null;
    }

    showModal(title, contentHtml, sizeClass = '') {
        const modal = document.getElementById('app-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const win = modal?.querySelector('.modal-window');

        if (modal && modalTitle && modalBody) {
            modalTitle.innerHTML = title;
            modalBody.innerHTML = contentHtml;
            if (win) {
                if (sizeClass === 'large') {
                    win.classList.add('large');
                } else {
                    win.classList.remove('large');
                }
            }
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

    // ========================================================
    // MODAL TÚI ĐỒ & ĐẠO CỤ (BAG MODAL)
    // ========================================================
    showBagModal(filterCategory = 'all') {
        this.currentModal = 'bag';
        const inv = window.gameState?.inventory || { gold: 1000, pokeballs: 5, potion: 3 };
        const gold = inv.gold !== undefined ? inv.gold : 500;
        const config = window.ITEMS_CONFIG || {};

        const allItemKeys = Object.keys(config);
        const displayItems = allItemKeys.filter(k => {
            const count = inv[k] || 0;
            const item = config[k];
            if (filterCategory !== 'all' && item.category !== filterCategory) return false;
            return count > 0 || item.category === 'recovery' || item.category === 'ball';
        }).map(k => ({
            ...config[k],
            count: inv[k] || 0
        }));

        const categories = [
            { id: 'all', label: 'Tất Cả' },
            { id: 'recovery', label: '🧪 Dược Phẩm' },
            { id: 'ball', label: '🔴 Phong Ấn Cầu' },
            { id: 'stone', label: '💎 Đá Tiến Hóa & Đạo Cụ' }
        ];

        let html = `
            <div class="bag-container">
                <div class="bag-top-bar">
                    <div class="bag-tabs">
                        ${categories.map(c => `
                            <button class="bag-tab-btn ${filterCategory === c.id ? 'active' : ''}" 
                                onclick="window.menuManager.showBagModal('${c.id}')">
                                ${c.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="bag-gold-badge">
                        <span>💰</span> <span>${gold.toLocaleString('vi-VN')} Vàng</span>
                    </div>
                </div>

                <div class="bag-items-grid">
                    ${displayItems.map(item => `
                        <div class="bag-item-card">
                            <div class="item-card-header">
                                <div class="item-icon-box" style="border-color: ${item.color || '#334155'}">
                                    <span>${item.icon || '📦'}</span>
                                </div>
                                <div class="item-card-title">
                                    <h4>${item.name}</h4>
                                    <span class="item-card-qty">Số lượng: x${item.count}</span>
                                </div>
                            </div>
                            <div class="item-card-desc">${item.desc}</div>
                            <div class="item-card-actions">
                                ${item.category === 'recovery' ? `
                                    <button class="btn-item-use" 
                                        ${item.count <= 0 ? 'disabled' : ''}
                                        onclick="window.menuManager.showUseItemTarget('${item.id}')">
                                        🧪 Sử Dụng
                                    </button>
                                ` : (item.category === 'ball' ? `
                                    <button class="btn-item-use" style="background: linear-gradient(180deg, #9b59b6, #8e44ad); border-color: #a29bfe;"
                                        ${item.count <= 0 ? 'disabled' : ''}
                                        onclick="alert('💡 Bóng bắt sủng vật sẽ được dùng trực tiếp trong các trận đấu gặp quái hoang dã!')">
                                        🔴 Dùng Trong Trận
                                    </button>
                                ` : `
                                    <button class="btn-item-use" style="background: linear-gradient(180deg, #f39c12, #d35400); border-color: #f1c40f;"
                                        onclick="alert('💎 Đạo cụ dùng khi sủng vật đạt đủ cấp độ thức tỉnh hoặc tiến hóa!')">
                                        ℹ️ Thông Tin
                                    </button>
                                `)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.showModal('🎒 TÚI ĐỒ & ĐẠO CỤ (VƯƠNG QUỐC SỦNG VẬT)', html, 'large');
    }

    // Chọn sủng vật để dùng dược phẩm
    showUseItemTarget(itemId) {
        const inv = window.gameState?.inventory;
        const config = window.ITEMS_CONFIG || {};
        const item = config[itemId];
        if (!item || !inv || (inv[itemId] || 0) <= 0) {
            alert('Bạn không có hoặc đã hết vật phẩm này!');
            return;
        }

        const team = window.gameState?.playerTeam || [];
        if (team.length === 0) {
            alert('Đội hình của bạn hiện chưa có sủng vật nào!');
            return;
        }

        let html = `
            <div class="item-target-modal">
                <div style="background: #111827; padding: 10px 14px; border-radius: 8px; border: 1px solid #374151; display: flex; align-items: center; justify-content: space-between;">
                    <div>Đang sử dụng: <strong>${item.name}</strong> (${item.icon}) • Còn: <strong>x${inv[itemId]}</strong></div>
                    <button class="bag-tab-btn" onclick="window.menuManager.showBagModal()">↩ Quay Lại Túi</button>
                </div>
                <p style="color: #94a3b8; font-size: 13px; margin: 4px 0;">Chọn sủng vật muốn áp dụng phục hồi:</p>
                <div style="display: flex; flex-direction: column; gap: 10px; max-height: 50vh; overflow-y: auto;">
                    ${team.map((m, idx) => {
                        const hpPct = Math.round((m.hp / m.maxHp) * 100);
                        const mpPct = Math.round((m.mp / m.maxMp) * 100);
                        return `
                            <div class="item-target-card" onclick="window.menuManager.applyItemToPet('${itemId}', ${idx})">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 44px; height: 44px; background: #020617; border: 1px solid #334155; border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        <canvas class="pet-target-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="40" height="40"></canvas>
                                    </div>
                                    <div>
                                        <div style="font-weight: 800; color: #f8fafc; font-size: 14px;">${m.name} <span style="color: #f59e0b; font-size: 12px;">Lv.${m.level || 5}</span></div>
                                        <div style="font-size: 11px; color: #94a3b8;">Hệ: <strong style="color: ${m.color || '#38bdf8'}">${m.type}</strong></div>
                                    </div>
                                </div>
                                <div style="width: 160px; display: flex; flex-direction: column; gap: 4px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                                        <span style="color: #22c55e;">HP:</span>
                                        <span style="color: #cbd5e1;">${m.hp}/${m.maxHp}</span>
                                    </div>
                                    <div class="vital-progress-bg">
                                        <div class="vital-progress-fill hp ${hpPct < 25 ? 'danger' : (hpPct < 50 ? 'warning' : '')}" style="width: ${hpPct}%"></div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                                        <span style="color: #38bdf8;">MP:</span>
                                        <span style="color: #cbd5e1;">${m.mp}/${m.maxMp}</span>
                                    </div>
                                    <div class="vital-progress-bg">
                                        <div class="vital-progress-fill mp" style="width: ${mpPct}%"></div>
                                    </div>
                                </div>
                                <button class="btn-item-use" style="padding: 6px 16px;">Chọn Áp Dụng</button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showModal(`🧪 SỬ DỤNG [${item.name}]`, html, 'large');
        setTimeout(() => {
            document.querySelectorAll('.pet-target-canvas').forEach(cv => {
                window.J2MESprite?.renderMonsterAvatar(cv, cv.dataset.sprite || 'npc2_1');
            });
        }, 20);
    }

    // Áp dụng item lên sủng vật
    applyItemToPet(itemId, petIdx) {
        const inv = window.gameState?.inventory;
        const config = window.ITEMS_CONFIG || {};
        const item = config[itemId];
        const team = window.gameState?.playerTeam || [];
        const pet = team[petIdx];

        if (!item || !inv || !pet || (inv[itemId] || 0) <= 0) return;

        // Xử lý hồi sinh
        if (item.revivePercent) {
            if (pet.hp > 0) {
                alert(`⚠️ ${pet.name} vẫn còn sinh lực dồi dào, không cần hồi sinh!`);
                return;
            }
            pet.hp = Math.floor((pet.maxHp * item.revivePercent) / 100);
            inv[itemId]--;
            window.soundEngine?.playVictory();
            alert(`💖 Đã hồi sinh thành công ${pet.name} và phục hồi ${pet.hp} HP!`);
            this.showBagModal('recovery');
            return;
        }

        // Nếu pet đã tử trận nhưng dùng thuốc thường
        if (pet.hp <= 0) {
            alert(`⚠️ ${pet.name} đã ngã xuống! Hãy dùng [Sinh Mệnh Thạch] để hồi sinh trước.`);
            return;
        }

        let healed = false;
        let healHpAmt = 0;
        let healMpAmt = 0;

        // Hồi máu
        if (item.healHpPercent) {
            if (pet.hp < pet.maxHp) {
                healHpAmt = Math.min(pet.maxHp - pet.hp, Math.floor((pet.maxHp * item.healHpPercent) / 100));
                pet.hp += healHpAmt;
                healed = true;
            }
        }

        // Hồi MP
        if (item.healMpPercent) {
            if (pet.mp < pet.maxMp) {
                healMpAmt = Math.min(pet.maxMp - pet.mp, Math.floor((pet.maxMp * item.healMpPercent) / 100));
                pet.mp += healMpAmt;
                healed = true;
            }
        }

        if (!healed) {
            alert(`⚠️ Sinh lực và Năng lượng của ${pet.name} đã ở mức tối đa!`);
            return;
        }

        inv[itemId]--;
        window.soundEngine?.playAttack();
        alert(`✨ Đã dùng [${item.name}] cho ${pet.name}! ${healHpAmt ? `+${healHpAmt} HP ` : ''}${healMpAmt ? `+${healMpAmt} MP` : ''}`);

        // Trở lại màn hình túi đồ
        this.showBagModal('recovery');
    }

    // ========================================================
    // MODAL ĐỘI HÌNH SỦNG VẬT (PET TEAM MODAL)
    // ========================================================
    showPetTeamModal() {
        this.currentModal = 'pet_team';
        const team = window.gameState?.playerTeam || [];

        const elemColors = {
            'Thực Vật': '#27ae60',
            'Kim Loại': '#d35400',
            'Phi Hành': '#8e44ad',
            'Mãnh Thú': '#c0392b',
            'Hải Dương': '#2980b9'
        };

        const isSingle = team.length === 1;

        let html = `
            <div class="team-container">
                <div class="team-header-bar">
                    <div class="team-count-badge">
                        🐾 Đội Hình: <strong>${team.length}/6</strong> Sủng Vật
                    </div>

                    <div class="team-slot-preview">
                        ${[0, 1, 2, 3, 4, 5].map(sIdx => {
                            const p = team[sIdx];
                            if (p) {
                                return `<div class="team-slot-pill active">${sIdx === 0 ? '👑 ' : ''}${p.name} <span style="color: #f59e0b;">Lv.${p.level || 5}</span></div>`;
                            } else {
                                return `<div class="team-slot-pill empty">+ Trống</div>`;
                            }
                        }).join('')}
                    </div>

                    <div style="display: flex; gap: 8px;">
                        <button class="bag-tab-btn" onclick="window.menuManager.showBagModal('recovery')">🎒 Dùng Thuốc Hồi Phục</button>
                    </div>
                </div>

                <div class="team-grid ${isSingle ? 'single-pet' : ''}">
                    ${team.map((m, idx) => {
                        const hpPct = Math.round((m.hp / m.maxHp) * 100);
                        const mpPct = Math.round((m.mp / m.maxMp) * 100);
                        const isStarter = idx === 0;
                        const elemColor = elemColors[m.type] || '#3498db';
                        const skills = m.skills || [];

                        return `
                            <div class="pet-team-card ${isStarter ? 'starter-active' : ''}">
                                <div class="pet-card-header">
                                    <div class="pet-avatar-wrap" style="border-color: ${elemColor}">
                                        <canvas class="pet-avatar-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="72" height="72"></canvas>
                                    </div>

                                    <div class="pet-identity">
                                        <div class="pet-name-line">
                                            <span class="pet-name-title">${m.name}</span>
                                            <span class="pet-level-badge">Lv.${m.level || 5}</span>
                                            <span class="pet-elem-badge" style="background: ${elemColor}">${m.type}</span>
                                            <span class="pet-tier-badge">⭐ Bậc ${m.tier || 1}</span>
                                        </div>

                                        <div class="pet-vitals">
                                            <div class="vital-bar-group">
                                                <span class="vital-label">HP</span>
                                                <div class="vital-progress-bg">
                                                    <div class="vital-progress-fill hp ${hpPct < 25 ? 'danger' : (hpPct < 50 ? 'warning' : '')}" style="width: ${hpPct}%"></div>
                                                </div>
                                                <span class="vital-numbers">${m.hp}/${m.maxHp}</span>
                                            </div>
                                            <div class="vital-bar-group">
                                                <span class="vital-label">MP</span>
                                                <div class="vital-progress-bg">
                                                    <div class="vital-progress-fill mp" style="width: ${mpPct}%"></div>
                                                </div>
                                                <span class="vital-numbers">${m.mp}/${m.maxMp}</span>
                                            </div>
                                        </div>
                                    </div>

                                    ${isStarter ? '<div class="pet-crown-pill">👑 TIÊN PHONG</div>' : ''}
                                </div>

                                <div class="pet-stats-hud">
                                    <div class="stat-hud-box">
                                        <span class="stat-lbl">⚔️ Công</span>
                                        <span class="stat-val">${m.attack || 15}</span>
                                    </div>
                                    <div class="stat-hud-box">
                                        <span class="stat-lbl">🛡️ Thủ</span>
                                        <span class="stat-val">${m.defense || 12}</span>
                                    </div>
                                    <div class="stat-hud-box">
                                        <span class="stat-lbl">⚡ Tốc</span>
                                        <span class="stat-val">${m.speed || 14}</span>
                                    </div>
                                    <div class="stat-hud-box">
                                        <span class="stat-lbl">🌟 Trưởng Thành</span>
                                        <span class="stat-val">${m.growth?.hp || 38}</span>
                                    </div>
                                </div>

                                <div class="pet-skills-section">
                                    <div class="pet-skills-title">🎯 KỸ NĂNG THI ĐẤU (${Math.min(4, skills.length)}/4):</div>
                                    <div class="pet-skills-grid">
                                        ${skills.slice(0, 4).map((sk, sIdx) => `
                                            <div class="skill-chip">
                                                <div class="skill-chip-top">
                                                    <span class="skill-chip-name">[${sIdx + 1}] ${sk.name}</span>
                                                    <span class="skill-chip-elem">${sk.type || m.type}</span>
                                                </div>
                                                <div class="skill-chip-stats">
                                                    ${sk.heal ? `Hồi +${sk.heal}% HP • MP:${sk.mpCost || 0}` : (sk.buffDef ? `Giáp +${sk.buffDef}% • MP:${sk.mpCost || 0}` : `Uy lực: ${sk.power || 15} • MP:${sk.mpCost || 0}`)}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                ${(() => {
                                    if (!m.evolution) return '';
                                    const evo = m.evolution;
                                    const inv = window.gameState?.inventory || {};
                                    const ownedQty = inv[evo.reqItemCode] || inv[evo.reqItemId] || (evo.reqItemId === 18 ? (inv.leafStone || 0) : (evo.reqItemId === 16 ? (inv.fireStone || 0) : (evo.reqItemId === 20 ? (inv.waterStone || 0) : (evo.reqItemId === 22 ? (inv.thunderStone || 0) : 0))));
                                    const canEvolve = ownedQty >= evo.reqQty;
                                    return `
                                        <div class="pet-evolution-box">
                                            <div class="pet-evo-info">
                                                <span class="pet-evo-title">✨ TIẾN HÓA KẾ TIẾP</span>
                                                <span class="pet-evo-target">Dạng mới: <span>${evo.targetName}</span></span>
                                                <span class="pet-evo-req ${canEvolve ? 'ready' : ''}">
                                                    Cần: <strong>${evo.reqItemName} x${evo.reqQty}</strong> (Túi có: ${ownedQty}/${evo.reqQty}) ${canEvolve ? '✓ ĐỦ TÀI LIỆU' : '✗ THIẾU TÀI LIỆU'}
                                                </span>
                                            </div>
                                            <button class="btn-evolve-gold" ${canEvolve ? '' : 'disabled'} onclick="window.menuManager.executeEvolution(${idx})">
                                                ${canEvolve ? '✨ TIẾN HÓA' : 'CHƯA ĐỦ'}
                                            </button>
                                        </div>
                                    `;
                                })()}

                                <div class="pet-card-actions">
                                    ${!isStarter ? `
                                        <button class="btn-pet-action primary" onclick="window.menuManager.setStarterPet(${idx})">
                                            👑 Chọn Xuất Trận Đầu
                                        </button>
                                    ` : `
                                        <div class="pet-active-status">
                                            ✓ Đang là Sủng vật Tiên phong
                                        </div>
                                    `}
                                    <button class="btn-pet-action secondary" onclick="window.menuManager.showBagModal('recovery')">
                                        🧪 Dùng Thuốc Hồi Phục
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showModal('🐾 QUẢN LÝ ĐỘI HÌNH SỦNG VẬT', html, 'large');
        this.startPetTeamAnimation();
    }

    // Thực hiện tiến hóa sủng vật
    executeEvolution(petIndex) {
        const team = window.gameState?.playerTeam;
        if (!team || petIndex < 0 || petIndex >= team.length) return;
        const m = team[petIndex];
        if (!m || !m.evolution) return;

        const evo = m.evolution;
        const inv = window.gameState?.inventory || {};
        const ownedQty = inv[evo.reqItemCode] || inv[evo.reqItemId] || (evo.reqItemId === 18 ? (inv.leafStone || 0) : (evo.reqItemId === 16 ? (inv.fireStone || 0) : (evo.reqItemId === 20 ? (inv.waterStone || 0) : (evo.reqItemId === 22 ? (inv.thunderStone || 0) : 0))));

        if (ownedQty < evo.reqQty) {
            alert(`⚠️ Chưa đủ tài liệu! Bạn cần ${evo.reqQty}x [${evo.reqItemName}], hiện chỉ có ${ownedQty}. Hãy ghé Tiệm Đá Tiến Hóa để mua thêm!`);
            return;
        }

        // Trừ tài liệu tiến hóa
        if (inv[evo.reqItemCode] !== undefined) inv[evo.reqItemCode] -= evo.reqQty;
        if (inv[evo.reqItemId] !== undefined) inv[evo.reqItemId] -= evo.reqQty;
        if (evo.reqItemId === 18 && inv.leafStone !== undefined) inv.leafStone = Math.max(0, inv.leafStone - evo.reqQty);
        if (evo.reqItemId === 16 && inv.fireStone !== undefined) inv.fireStone = Math.max(0, inv.fireStone - evo.reqQty);
        if (evo.reqItemId === 20 && inv.waterStone !== undefined) inv.waterStone = Math.max(0, inv.waterStone - evo.reqQty);
        if (evo.reqItemId === 22 && inv.thunderStone !== undefined) inv.thunderStone = Math.max(0, inv.thunderStone - evo.reqQty);

        // Tìm sủng vật đích
        const target = (window.POKEDEX_DATA?.find(p => p.id === evo.targetId)) || 
                       (window.MONSTERS_PRESET?.find(p => p.id === evo.targetId));
        if (!target) return;

        const oldName = m.name;
        m.id = target.id;
        m.code = target.code;
        m.name = target.name;
        m.tier = target.tier || (m.tier + 1);
        m.type = target.type || m.type;
        m.color = target.color || m.color;
        m.spriteKey = target.spriteKey;
        m.sprite = target.sprite;
        m.description = target.description || m.description;
        m.evolution = target.evolution || null;
        m.source = target.source || m.source;
        m.growth = target.growth || m.growth;
        m.baseHP = target.baseHP;
        m.baseMP = target.baseMP;
        m.baseATK = target.baseATK;
        m.baseDEF = target.baseDEF;
        m.baseSPD = target.baseSPD;

        // Cập nhật chỉ số theo level hiện tại
        if (window.calculateMonsterStats) {
            const stats = window.calculateMonsterStats(m, m.level || 5);
            m.maxHp = stats.maxHp;
            m.hp = stats.maxHp; // Hồi phục hoàn toàn sinh lực khi tiến hóa!
            m.maxMp = stats.maxMp;
            m.mp = stats.maxMp;
            m.attack = stats.attack;
            m.defense = stats.defense;
            m.speed = stats.speed;
        }

        // Cập nhật kỹ năng mới từ dạng tiến hóa
        if (target.skills && target.skills.length > 0) {
            m.skills = target.skills;
        }

        window.soundEngine?.playLevelUp();
        alert(`🌟 TIẾN HÓA THÀNH CÔNG!\n\n${oldName} đã chính thức tiến hóa thành [${target.name}] (Bậc ${m.tier})!\nChỉ số Công/Thủ/HP đã được cường hóa vượt bậc và hồi phục hoàn toàn!`);
        this.showPetTeamModal();
    }

    renderPetCanvases() {
        const canvases = document.querySelectorAll('.pet-avatar-canvas');
        canvases.forEach(cv => {
            const key = cv.dataset.sprite || 'npc2_1';
            window.J2MESprite?.renderMonsterAvatar(cv, key, {
                stepIndex: this.petAnimStep || 0,
                drawShadow: true
            });
        });
    }

    startPetTeamAnimation() {
        if (this.petAnimInterval) {
            clearInterval(this.petAnimInterval);
            this.petAnimInterval = null;
        }
        this.petAnimStep = 0;
        setTimeout(() => this.renderPetCanvases(), 20);
        this.petAnimInterval = setInterval(() => {
            if (this.currentModal !== 'pet_team') {
                clearInterval(this.petAnimInterval);
                this.petAnimInterval = null;
                return;
            }
            this.petAnimStep = (this.petAnimStep + 1) % 4;
            this.renderPetCanvases();
        }, 260);
    }

    // Đổi sủng vật lên vị trí tiên phong (Slot 0)
    setStarterPet(idx) {
        const team = window.gameState?.playerTeam;
        if (!team || idx <= 0 || idx >= team.length) return;
        const chosen = team.splice(idx, 1)[0];
        team.unshift(chosen);
        window.soundEngine?.playMenuSelect();
        this.showPetTeamModal();
    }

    // Cập nhật số vàng hiển thị trên Header Menu
    updateInGameHeaderGold() {
        const goldEl = document.getElementById('ingame-player-gold');
        if (goldEl) {
            goldEl.textContent = `💰 ${(window.gameState?.inventory?.gold || 0).toLocaleString('vi-VN')} Vàng`;
        }
    }

    // ========================================================
    // CỬA HÀNG VƯƠNG QUỐC CẦU VỒNG (ROYAL SHOP)
    // ========================================================
    showShopModal(category = 'supplies') {
        this.currentModal = 'shop';
        const inv = window.gameState?.inventory || { gold: 1000 };
        const gold = inv.gold !== undefined ? inv.gold : 1000;
        const catalog = window.SHOP_CATALOG || {};
        const itemsConfig = window.ITEMS_CONFIG || {};

        const tabs = [
            { id: 'supplies', label: '🧪 Tạp Hóa & Cầu', icon: '🧪' },
            { id: 'evolution', label: '💎 Đá Tiến Hóa', icon: '💎' },
            { id: 'skills', label: '📜 Sách Kỹ Năng', icon: '📜' },
            { id: 'sell', label: '💰 Bán Đồ (Lấy Vàng)', icon: '💰' }
        ];

        let itemsToDisplay = [];
        if (category === 'sell') {
            itemsToDisplay = Object.keys(itemsConfig)
                .filter(k => k.startsWith('item_') && (inv[k] || 0) > 0)
                .map(k => ({
                    ...itemsConfig[k],
                    count: inv[k]
                }));
        } else {
            const shopData = catalog[category] || catalog.supplies;
            const itemIds = shopData.itemIds || [];
            itemsToDisplay = itemIds.map(id => {
                const key = `item_${id}`;
                return {
                    ...(itemsConfig[key] || { name: `Vật phẩm ${id}`, price: 100, desc: '' }),
                    count: inv[key] || 0
                };
            });
        }

        let html = `
            <div class="shop-container">
                <div class="shop-top-bar">
                    <div class="shop-tabs">
                        ${tabs.map(t => `
                            <button class="shop-tab-btn ${category === t.id ? 'active' : ''}" 
                                onclick="window.menuManager.showShopModal('${t.id}')">
                                ${t.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="shop-gold-badge">
                        <span>💰</span> <span id="shop-gold-display">${gold.toLocaleString('vi-VN')} Vàng</span>
                    </div>
                </div>

                ${category === 'sell' && itemsToDisplay.length === 0 ? `
                    <div style="text-align: center; padding: 40px; color: #94a3b8;">
                        <div style="font-size: 40px; margin-bottom: 8px;">🎒</div>
                        <p>Túi đồ của bạn hiện chưa có vật phẩm nào để bán!</p>
                    </div>
                ` : `
                    <div class="shop-items-grid">
                        ${itemsToDisplay.map(item => `
                            <div class="shop-item-card">
                                <div class="shop-item-header">
                                    <div class="shop-item-icon-box">
                                        <span>${item.icon || '📦'}</span>
                                    </div>
                                    <div class="shop-item-meta">
                                        <h4 class="shop-item-name">${item.name}</h4>
                                        <span class="shop-item-owned">Đang có: x${item.count}</span>
                                    </div>
                                </div>
                                <div class="shop-item-desc">${item.desc}</div>
                                <div class="shop-item-bottom">
                                    <div class="shop-price-tag">
                                        💰 ${(category === 'sell' ? (item.sellPrice || 10) : item.price).toLocaleString('vi-VN')} Vàng
                                    </div>
                                    <div class="shop-actions-group">
                                        ${category === 'sell' ? `
                                            <button class="btn-shop-action sell-primary" onclick="window.menuManager.sellShopItem('${item.code}', 1, '${category}')">
                                                Bán x1
                                            </button>
                                            <button class="btn-shop-action" onclick="window.menuManager.sellShopItem('${item.code}', ${item.count}, '${category}')">
                                                Bán Hết
                                            </button>
                                        ` : `
                                            <button class="btn-shop-action buy-primary" ${gold < item.price ? 'disabled' : ''} onclick="window.menuManager.buyShopItem('${item.code}', 1, '${category}')">
                                                Mua x1
                                            </button>
                                            <button class="btn-shop-action" ${gold < item.price * 5 ? 'disabled' : ''} onclick="window.menuManager.buyShopItem('${item.code}', 5, '${category}')">
                                                Mua x5
                                            </button>
                                        `}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;

        this.showModal('🏪 CỬA HÀNG VƯƠNG QUỐC CẦU VỒNG (ROYAL SHOP)', html, 'large');
    }

    buyShopItem(itemCode, qty, currentCategory) {
        const inv = window.gameState?.inventory;
        const config = window.ITEMS_CONFIG || {};
        const item = config[itemCode];
        if (!item || !inv) return;

        const totalCost = item.price * qty;
        if ((inv.gold || 0) < totalCost) {
            alert('⚠️ Bạn không đủ vàng để mua số lượng này!');
            return;
        }

        inv.gold -= totalCost;
        inv[itemCode] = (inv[itemCode] || 0) + qty;

        // Đồng bộ các key tương thích ngược
        if (itemCode === 'item_9') inv.pokeballs = (inv.pokeballs || 0) + qty;
        else if (itemCode === 'item_10') inv.greatBalls = (inv.greatBalls || 0) + qty;
        else if (itemCode === 'item_11') inv.masterBalls = (inv.masterBalls || 0) + qty;
        else if (itemCode === 'item_0') inv.potion = (inv.potion || 0) + qty;
        else if (itemCode === 'item_1') inv.superPotion = (inv.superPotion || 0) + qty;
        else if (itemCode === 'item_2') inv.chocolate = (inv.chocolate || 0) + qty;
        else if (itemCode === 'item_3') inv.ether = (inv.ether || 0) + qty;
        else if (itemCode === 'item_6') inv.elixir = (inv.elixir || 0) + qty;
        else if (itemCode === 'item_7') inv.revive = (inv.revive || 0) + qty;
        else if (itemCode === 'item_18') inv.leafStone = (inv.leafStone || 0) + qty;
        else if (itemCode === 'item_16') inv.fireStone = (inv.fireStone || 0) + qty;
        else if (itemCode === 'item_20') inv.waterStone = (inv.waterStone || 0) + qty;
        else if (itemCode === 'item_22') inv.thunderStone = (inv.thunderStone || 0) + qty;

        window.soundEngine?.playMenuSelect();
        this.updateInGameHeaderGold();
        this.showShopModal(currentCategory);
    }

    sellShopItem(itemCode, qty, currentCategory) {
        const inv = window.gameState?.inventory;
        const config = window.ITEMS_CONFIG || {};
        const item = config[itemCode];
        if (!item || !inv || (inv[itemCode] || 0) <= 0) return;

        const actualQty = Math.min(qty, inv[itemCode]);
        const earned = (item.sellPrice || 10) * actualQty;

        inv[itemCode] -= actualQty;
        inv.gold = (inv.gold || 0) + earned;

        // Đồng bộ key cũ
        if (itemCode === 'item_9' && inv.pokeballs) inv.pokeballs = Math.max(0, inv.pokeballs - actualQty);
        else if (itemCode === 'item_0' && inv.potion) inv.potion = Math.max(0, inv.potion - actualQty);

        window.soundEngine?.playMenuClick();
        this.updateInGameHeaderGold();
        this.showShopModal(currentCategory);
    }

    // ========================================================
    // SỦNG VẬT ĐỒ GIÁM (POKEDEX)
    // ========================================================
    showPokedexModal(filterElem = 'all', searchKeyword = '') {
        this.currentModal = 'pokedex';
        const list = window.POKEDEX_DATA || [];
        const elements = window.POKEDEX_ELEMENTS || ['Thực Vật', 'Kim Loại', 'Phi Hành', 'Mãnh Thú', 'Hải Dương'];
        const team = window.gameState?.playerTeam || [];
        const caughtCodes = new Set(team.map(m => m.code));

        const elemColors = {
            'Thực Vật': '#27ae60',
            'Kim Loại': '#d35400',
            'Phi Hành': '#8e44ad',
            'Mãnh Thú': '#c0392b',
            'Hải Dương': '#2980b9'
        };

        const filtered = list.filter(m => {
            if (filterElem !== 'all' && m.type !== filterElem) return false;
            if (searchKeyword && !m.name.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
            return true;
        });

        let html = `
            <div class="pokedex-container">
                <div class="pokedex-header-bar">
                    <div class="pokedex-stats-pill">
                        Sách Đồ Giám: <strong>${list.length}</strong> Loài • Đội hình: <strong>${team.length}/6</strong>
                    </div>
                    <input type="text" class="pokedex-search-input" id="pokedex-search" 
                        placeholder="🔍 Tìm kiếm theo tên..." value="${searchKeyword}"
                        oninput="window.menuManager.showPokedexModal('${filterElem}', this.value)">
                </div>

                <div class="pokedex-tabs">
                    <button class="pokedex-tab-btn ${filterElem === 'all' ? 'active' : ''}" 
                        onclick="window.menuManager.showPokedexModal('all', '${searchKeyword}')">
                        Tất Cả (${list.length})
                    </button>
                    ${elements.map(elem => {
                        const count = list.filter(m => m.type === elem).length;
                        return `
                            <button class="pokedex-tab-btn ${filterElem === elem ? 'active' : ''}" 
                                style="${filterElem === elem ? `background: ${elemColors[elem]}; border-color: ${elemColors[elem]};` : ''}"
                                onclick="window.menuManager.showPokedexModal('${elem}', '${searchKeyword}')">
                                ${elem} (${count})
                            </button>
                        `;
                    }).join('')}
                </div>

                <div class="pokedex-grid">
                    ${filtered.map(m => {
                        const isCaught = caughtCodes.has(m.code);
                        const numStr = m.id < 10 ? `00${m.id}` : (m.id < 100 ? `0${m.id}` : `${m.id}`);
                        const elemColor = elemColors[m.type] || '#38bdf8';
                        return `
                            <div class="pokedex-card" onclick="window.menuManager.showPokedexDetail(${m.id})">
                                <span class="pokedex-card-num">#${numStr}</span>
                                <span class="pokedex-card-status">${isCaught ? '✅ Đã Bắt' : '📖 Đã Khám Phá'}</span>
                                <div class="pokedex-card-avatar" style="border-color: ${elemColor}">
                                    <canvas class="pokedex-card-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="52" height="52"></canvas>
                                </div>
                                <h4 class="pokedex-card-name">${m.name}</h4>
                                <span class="pokedex-card-elem" style="background: ${elemColor}">${m.type}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showModal('📖 SỦNG VẬT ĐỒ GIÁM (VƯƠNG QUỐC CẦU VỒNG)', html, 'large');
        this.startPokedexAnimation();
    }

    showPokedexDetail(monsterId) {
        const list = window.POKEDEX_DATA || [];
        const m = list.find(item => item.id === monsterId);
        if (!m) return;

        const elemColors = {
            'Thực Vật': '#27ae60',
            'Kim Loại': '#d35400',
            'Phi Hành': '#8e44ad',
            'Mãnh Thú': '#c0392b',
            'Hải Dương': '#2980b9'
        };
        const elemColor = elemColors[m.type] || '#38bdf8';
        const numStr = m.id < 10 ? `00${m.id}` : (m.id < 100 ? `0${m.id}` : `${m.id}`);

        const typeEff = window.TYPE_EFFECTIVENESS?.[m.type];
        const strong = typeEff?.strongAgainst?.join(', ') || 'Không';
        const weak = typeEff?.weakAgainst?.join(', ') || 'Không';

        let html = `
            <div class="pokedex-detail-view">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button class="bag-tab-btn" onclick="window.menuManager.showPokedexModal()">↩ Trở Lại Danh Sách</button>
                    <span style="font-family: monospace; font-size: 14px; color: #94a3b8; font-weight: 800;">MÃ SỐ #${numStr}</span>
                </div>

                <div class="pokedex-detail-hero">
                    <div class="pokedex-hero-avatar" style="border-color: ${elemColor}">
                        <canvas class="pokedex-detail-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="80" height="80"></canvas>
                    </div>
                    <div class="pokedex-hero-meta">
                        <div class="pokedex-hero-title">
                            ${m.name}
                            <span class="pet-tier-badge">⭐ Bậc ${m.tier || 1}</span>
                        </div>
                        <div class="pokedex-hero-badges">
                            <span class="pet-elem-badge" style="background: ${elemColor}">${m.type}</span>
                            <span style="font-size: 11px; color: #94a3b8; background: #020617; padding: 2px 8px; border-radius: 4px; border: 1px solid #334155;">
                                Khắc chế: <strong style="color: #34d399;">${strong}</strong> • Bị khắc: <strong style="color: #f87171;">${weak}</strong>
                            </span>
                        </div>
                        <div class="pokedex-hero-desc">${m.description}</div>
                    </div>
                </div>

                <div class="pokedex-stats-table">
                    <div class="pokedex-stat-col">
                        <span>❤️ Sinh Mệnh</span>
                        <strong>${m.baseHP}</strong>
                    </div>
                    <div class="pokedex-stat-col">
                        <span>🔷 Năng Lượng</span>
                        <strong>${m.baseMP}</strong>
                    </div>
                    <div class="pokedex-stat-col">
                        <span>⚔️ Tấn Công</span>
                        <strong>${m.baseATK}</strong>
                    </div>
                    <div class="pokedex-stat-col">
                        <span>🛡️ Phòng Ngự</span>
                        <strong>${m.baseDEF}</strong>
                    </div>
                    <div class="pokedex-stat-col">
                        <span>⚡ Tốc Độ</span>
                        <strong>${m.baseSPD}</strong>
                    </div>
                </div>

                <div class="pokedex-source-box">
                    📍 <strong>Nguồn Gốc Xuất Hiện:</strong> ${m.source}
                </div>

                ${m.evolution ? `
                    <div class="pet-evolution-box" style="margin-top: 0;">
                        <div class="pet-evo-info">
                            <span class="pet-evo-title">🧬 NHÁNH TIẾN HÓA TRUYỀN THỪA</span>
                            <span class="pet-evo-target">Tiến hóa lên: <span>${m.evolution.targetName}</span></span>
                            <span class="pet-evo-req">
                                Yêu cầu tài liệu: <strong>${m.evolution.reqItemName} x${m.evolution.reqQty}</strong>
                            </span>
                        </div>
                        <button class="btn-pet-action primary" onclick="window.menuManager.showPokedexDetail(${m.evolution.targetId})">
                            Xem Dạng Mới ▶
                        </button>
                    </div>
                ` : `
                    <div style="background: #0f172a; border: 1px solid #334155; padding: 10px 14px; border-radius: 6px; font-size: 12px; color: #f59e0b; text-align: center;">
                        👑 Đây là Dạng Tiến Hóa Tối Thượng trong chuỗi tiến hóa của loài này!
                    </div>
                `}
            </div>
        `;

        this.showModal(`📖 CHI TIẾT SỦNG VẬT #${numStr}: ${m.name.toUpperCase()}`, html, 'large');
        setTimeout(() => {
            const cv = document.querySelector('.pokedex-detail-canvas');
            if (cv) {
                window.J2MESprite?.renderMonsterAvatar(cv, m.spriteKey || 'npc2_1', { stepIndex: 0, drawShadow: true });
            }
        }, 30);
    }

    renderPokedexCanvases() {
        const canvases = document.querySelectorAll('.pokedex-card-canvas');
        canvases.forEach(cv => {
            const key = cv.dataset.sprite || 'npc2_1';
            window.J2MESprite?.renderMonsterAvatar(cv, key, {
                stepIndex: this.pokedexAnimStep || 0,
                drawShadow: true
            });
        });
    }

    startPokedexAnimation() {
        if (this.pokedexAnimInterval) {
            clearInterval(this.pokedexAnimInterval);
            this.pokedexAnimInterval = null;
        }
        this.pokedexAnimStep = 0;
        setTimeout(() => this.renderPokedexCanvases(), 20);
        this.pokedexAnimInterval = setInterval(() => {
            if (this.currentModal !== 'pokedex') {
                clearInterval(this.pokedexAnimInterval);
                this.pokedexAnimInterval = null;
                return;
            }
            this.pokedexAnimStep = (this.pokedexAnimStep + 1) % 4;
            this.renderPokedexCanvases();
        }, 280);
    }


    // ========================================================
    // NHẬT KÝ NHIỆM VỤ CỐT TRUYỆN REA J2ME (QUEST LOG)
    // ========================================================
    showQuestModal(activeTab = 'all') {
        this.currentModal = 'quests';
        const qData = window.QUESTS_DATA || { mainQuests: [], sideQuests: [] };
        const progress = window.gameState?.questProgress || { mainIndex: 0, completedSide: [] };
        window.gameState.questProgress = progress;

        const mainList = qData.mainQuests.map((q, idx) => {
            let status = 'pending';
            if (idx < progress.mainIndex) status = 'completed';
            else if (idx === progress.mainIndex) status = 'active';
            return { ...q, status };
        });

        const sideList = qData.sideQuests.map((q, idx) => {
            let status = progress.completedSide.includes(q.id) ? 'completed' : 'active';
            return { ...q, status };
        });

        let displayQuests = [];
        if (activeTab === 'main') {
            displayQuests = mainList;
        } else if (activeTab === 'side') {
            displayQuests = sideList;
        } else {
            // Hiển thị nhiệm vụ chính đang active + 3 nhiệm vụ phụ đầu tiên + các nhiệm vụ đã hoàn thành gần đây
            displayQuests = [
                ...mainList.filter(q => q.status === 'active'),
                ...sideList.slice(0, 4),
                ...mainList.filter(q => q.status === 'completed').slice(-3)
            ];
        }

        const completedCount = mainList.filter(q => q.status === 'completed').length + progress.completedSide.length;
        const totalQuests = mainList.length + sideList.length;

        let html = `
            <div class="quest-container">
                <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #334155; padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <span style="font-weight: 800; color: #f8fafc; font-size: 14px;">📜 Cốt Truyện Nguyên Bản J2ME: Vương Quốc Sủng Cầu Vồng</span>
                        <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">57 Nhiệm vụ chính tuyến • 40 Nhiệm vụ phụ tuyến giải mã từ <code>mission0.t & mission1.t</code></div>
                    </div>
                    <span style="color: #fbbf24; font-weight: 800; font-size: 13px; background: #020617; padding: 4px 10px; border-radius: 6px; border: 1px solid #f59e0b;">
                        🏆 Tiến độ: ${completedCount}/${totalQuests}
                    </span>
                </div>

                <div class="shop-tabs" style="margin: 0;">
                    <button class="shop-tab-btn ${activeTab === 'all' ? 'active' : ''}" onclick="window.menuManager.showQuestModal('all')">
                        🌟 Nổi Bật (${displayQuests.length})
                    </button>
                    <button class="shop-tab-btn ${activeTab === 'main' ? 'active' : ''}" onclick="window.menuManager.showQuestModal('main')">
                        ⚔️ Chính Tuyến (${mainList.length})
                    </button>
                    <button class="shop-tab-btn ${activeTab === 'side' ? 'active' : ''}" onclick="window.menuManager.showQuestModal('side')">
                        🎯 Phụ Tuyến (${sideList.length})
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px; max-height: 480px; overflow-y: auto; padding-right: 6px;">
                    ${displayQuests.map((q, idx) => `
                        <div class="quest-card ${q.status}">
                            <div class="quest-header-line">
                                <span class="quest-title-text">
                                    ${q.type === 'main' ? '👑 [Chính Tuyến]' : '🎯 [Phụ Tuyến]'} #${q.index + 1}: ${q.title}
                                </span>
                                <span class="quest-status-badge ${q.status}">
                                    ${q.status === 'completed' ? '✓ ĐÃ HOÀN THÀNH' : (q.status === 'active' ? '⚔️ ĐANG TIẾN HÀNH' : '🔒 CHƯA MỞ')}
                                </span>
                            </div>
                            <div class="quest-desc-text" style="font-size: 13px; line-height: 1.6;">
                                ${q.descHtml || q.desc}
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                                <div class="quest-reward-line" style="margin: 0;">
                                    🎁 Thưởng: <strong>💰 +${q.reward.gold} Vàng</strong> • <strong>⭐ +${q.reward.exp} EXP</strong>
                                </div>
                                ${q.status === 'active' ? `
                                    <button class="btn-pet-action primary" style="padding: 4px 14px; font-size: 11px;" onclick="window.menuManager.claimQuestReward('${q.type}', ${q.index})">
                                        Hoàn Thành Sớm ▶
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.showModal('📜 SỔ NHIỆM VỤ CỐT TRUYỆN HOÀNG GIA', html, 'large');
    }

    claimQuestReward(type, index) {
        const qData = window.QUESTS_DATA;
        if (!qData) return;
        const progress = window.gameState.questProgress;
        const quest = type === 'main' ? qData.mainQuests[index] : qData.sideQuests[index];
        if (!quest) return;

        window.gameState.gold = (window.gameState.gold || 0) + quest.reward.gold;
        if (type === 'main') {
            progress.mainIndex = Math.max(progress.mainIndex, index + 1);
        } else {
            if (!progress.completedSide.includes(quest.id)) {
                progress.completedSide.push(quest.id);
            }
        }

        window.soundEngine?.playLevelUp();
        alert(`🎉 Chúc mừng bạn đã hoàn thành nhiệm vụ [${quest.title}]!\nNhận được: 💰 +${quest.reward.gold} Vàng & ⭐ +${quest.reward.exp} EXP!`);
        this.updateInGameHeaderGold();
        this.showQuestModal(type === 'main' ? 'main' : 'side');
    }

    // ========================================================
    // HỆ THỐNG LÒ ẤP TRỨNG HOÀNG GIA REA (EGG INCUBATOR)
    // ========================================================
    showIncubatorModal() {
        this.currentModal = 'incubator';
        const inv = window.gameState?.inventory || {};
        const config = window.INCUBATOR_CONFIG || { eggConfig: {}, acceleratorItems: {} };
        const eggConfig = config.eggConfig;
        
        window.gameState.incubator = window.gameState.incubator || {
            eggItem: null,
            progress: 0,
            maxSteps: 100
        };
        const inc = window.gameState.incubator;

        let contentHtml = '';
        if (inc.eggItem && eggConfig[inc.eggItem]) {
            const egg = eggConfig[inc.eggItem];
            const pct = Math.min(100, Math.floor((inc.progress / inc.maxSteps) * 100));
            const isReady = pct >= 100;

            contentHtml = `
                <div class="incubator-main-card">
                    <div class="egg-display-wrapper">
                        <div class="egg-aura-glow" style="background: radial-gradient(circle, ${egg.color}66 0%, transparent 70%);"></div>
                        <div class="egg-icon-large ${isReady ? 'egg-ready-wobble' : ''}">🥚</div>
                    </div>
                    <div style="font-size: 18px; font-weight: 800; color: ${egg.color};">
                        ${egg.name} (Hệ ${egg.element})
                    </div>
                    <div style="font-size: 12px; color: #cbd5e1; max-width: 420px;">
                        ${egg.desc}
                    </div>

                    <div class="incubator-progress-container">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #cbd5e1;">
                            <span>Tiến độ ấp:</span>
                            <span style="color: ${isReady ? '#f59e0b' : '#38bdf8'}; font-weight: 800;">
                                ${isReady ? '✨ SẴN SÀNG NỞ!' : `${inc.progress}/${inc.maxSteps} Bước (${pct}%)`}
                            </span>
                        </div>
                        <div class="incubator-progress-track">
                            <div class="incubator-progress-fill" style="width: ${pct}%;"></div>
                        </div>
                        <div style="font-size: 11px; color: #94a3b8;">
                            💡 Mỗi bước đi trên bản đồ tích luỹ 1 bước. Mỗi trận thắng tích lũy 10 bước!
                        </div>
                    </div>

                    <div class="incubator-actions">
                        ${isReady ? `
                            <button class="btn-hatch-rainbow" onclick="window.menuManager.hatchIncubatorEgg()">
                                ✨ ẤP NỞ NGAY! CHÀO ĐÓN SỦNG VẬT MỚI ✨
                            </button>
                        ` : `
                            <button class="btn-pet-action secondary" onclick="window.menuManager.accelerateIncubation('item_13')">
                                🧪 Dùng Dược Thủy Ấp Trứng (+50 bước) [Còn: ${inv['item_13'] || 0}]
                            </button>
                            <button class="btn-pet-action secondary" onclick="window.menuManager.accelerateIncubation('item_3')">
                                🍖 Dùng Thức Ăn Thú Cưng (+20 bước) [Còn: ${inv['item_3'] || 0}]
                            </button>
                        `}
                    </div>
                </div>
            `;
        } else {
            // Chưa có trứng trong lò: Cho chọn trứng từ túi đồ
            const availableEggs = Object.keys(eggConfig).filter(k => (inv[k] || 0) > 0);

            contentHtml = `
                <div style="background: #0f172a; border: 1px solid #334155; padding: 14px; border-radius: 8px; text-align: center; color: #94a3b8; font-size: 13px; margin-bottom: 16px;">
                    🔥 <strong>Lò Ấp Trứng Hoàng Gia đang trống!</strong> Hãy chọn một Quả Trứng từ hành trang để bắt đầu quá trình ấp nở ra sủng vật quý hiếm!
                </div>

                ${availableEggs.length > 0 ? `
                    <div class="egg-selector-grid">
                        ${availableEggs.map(eggId => {
                            const e = eggConfig[eggId];
                            return `
                                <div class="egg-card-option" onclick="window.menuManager.selectEggToIncubate('${eggId}')">
                                    <div style="font-size: 36px;">🥚</div>
                                    <div style="flex: 1;">
                                        <div style="font-weight: 800; color: ${e.color}; font-size: 14px;">${e.name}</div>
                                        <div style="font-size: 11px; color: #cbd5e1;">Hệ: <strong>${e.element}</strong> • Số lượng: <strong>x${inv[eggId]}</strong></div>
                                        <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">${e.desc}</div>
                                        <button class="btn-pet-action primary" style="margin-top: 8px; padding: 4px 10px; font-size: 11px;">
                                            Đặt Vào Lò Ấp ▶
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 32px 16px; background: #1e293b; border-radius: 8px; border: 1px dashed #475569;">
                        <div style="font-size: 40px; margin-bottom: 8px;">📭</div>
                        <div style="font-weight: 800; color: #f8fafc; font-size: 15px;">Bạn hiện chưa có Quả Trứng Sủng Vật nào!</div>
                        <div style="color: #94a3b8; font-size: 12px; margin-top: 4px; max-width: 440px; margin-left: auto; margin-right: auto;">
                            Có thể tìm trứng từ phần thưởng Nhiệm vụ cốt truyện J2ME, hoặc ghé Cửa Hàng Hoàng Gia mua Trứng Ngũ Hành!
                        </div>
                    </div>
                `}
            `;
        }

        const html = `
            <div class="incubator-container">
                ${contentHtml}
            </div>
        `;

        this.showModal('🥚 LÒ ẤP TRỨNG HOÀNG GIA (EGG INCUBATOR)', html, 'medium');
    }

    selectEggToIncubate(eggId) {
        const inv = window.gameState?.inventory;
        const config = window.INCUBATOR_CONFIG?.eggConfig?.[eggId];
        if (!inv || !config || (inv[eggId] || 0) <= 0) return;

        inv[eggId]--;
        window.gameState.incubator = {
            eggItem: eggId,
            progress: 0,
            maxSteps: config.stepsRequired || 100
        };

        window.soundEngine?.playMenuSelect();
        this.showIncubatorModal();
    }

    accelerateIncubation(itemId) {
        const inv = window.gameState?.inventory;
        const inc = window.gameState?.incubator;
        if (!inv || !inc || !inc.eggItem) return;

        if ((inv[itemId] || 0) <= 0) {
            alert('⚠️ Bạn không có đủ vật phẩm hỗ trợ ấp trứng này trong hành trang!');
            return;
        }

        inv[itemId]--;
        const boost = itemId === 'item_13' ? 50 : 20;
        inc.progress = Math.min(inc.maxSteps, inc.progress + boost);
        window.soundEngine?.playMenuSelect();
        this.showIncubatorModal();
    }

    hatchIncubatorEgg() {
        const inc = window.gameState?.incubator;
        if (!inc || !inc.eggItem) return;
        const config = window.INCUBATOR_CONFIG?.eggConfig?.[inc.eggItem];
        if (!config) return;

        // Chọn sủng vật từ pool của trứng
        const pool = config.pool;
        const pickedId = pool[Math.floor(Math.random() * pool.length)];
        const preset = window.MONSTERS_PRESET?.[pickedId] || { name: 'Thụ Quái', type: config.element };

        const newPet = {
            id: pickedId,
            name: preset.name,
            level: 5,
            type: preset.type || config.element,
            hp: preset.baseHp || 70,
            maxHp: preset.baseHp || 70,
            mp: 35,
            maxMp: 35,
            attack: preset.baseAtk || 18,
            defense: preset.baseDef || 15,
            speed: preset.baseSpd || 12,
            spriteKey: `npc2_${pickedId + 1}`,
            skills: preset.skills || ['Tấn công']
        };

        window.gameState.playerTeam = window.gameState.playerTeam || [];
        window.gameState.storageBox = window.gameState.storageBox || [];

        let dest = 'Đội Hình';
        if (window.gameState.playerTeam.length < 6) {
            window.gameState.playerTeam.push(newPet);
        } else {
            window.gameState.storageBox.push(newPet);
            dest = 'Kho Lưu Trữ Sủng Vật (Do đội hình đã đủ 6 pet)';
        }

        inc.eggItem = null;
        inc.progress = 0;

        window.soundEngine?.playLevelUp();
        alert(`🎉 VỎ TRỨNG ĐÃ NỞ RA SỦNG VẬT QUÝ HIẾM!\n\n🐾 Tên: ${newPet.name} (Lv.5)\n✨ Hệ: ${newPet.type}\n📍 Đã được đưa vào: ${dest}!`);
        this.showIncubatorModal();
    }

    // ========================================================
    // KHO LƯU TRỮ SỦNG VẬT HOÀNG GIA (STORAGE BOX)
    // ========================================================
    showStorageBoxModal() {
        this.currentModal = 'storage_box';
        const team = window.gameState?.playerTeam || [];
        const box = window.gameState?.storageBox || [];
        window.gameState.storageBox = box;

        const html = `
            <div class="box-storage-container">
                <!-- CỘT ĐỘI HÌNH (MAX 6) -->
                <div class="box-panel">
                    <div class="box-panel-header">
                        <span>🐾 ĐỘI HÌNH HIỆN TẠI</span>
                        <span style="color: #cbd5e1; font-size: 12px;">${team.length}/6 Sủng vật</span>
                    </div>
                    <div class="box-pet-list">
                        ${team.map((m, idx) => `
                            <div class="box-pet-card">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 36px; height: 36px; background: #020617; border: 1px solid #334155; border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        <canvas class="box-pet-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="32" height="32"></canvas>
                                    </div>
                                    <div>
                                        <div style="font-weight: 800; color: #f8fafc; font-size: 13px;">${m.name} <span style="color: #f59e0b; font-size: 11px;">Lv.${m.level || 5}</span></div>
                                        <div style="font-size: 11px; color: #94a3b8;">Hệ: <strong style="color: ${m.color || '#38bdf8'}">${m.type}</strong> • HP: ${m.hp}/${m.maxHp}</div>
                                    </div>
                                </div>
                                ${team.length > 1 ? `
                                    <button class="btn-pet-action secondary" style="padding: 4px 10px; font-size: 11px;" onclick="window.menuManager.depositPetToBox(${idx})">
                                        Gửi Kho 📥
                                    </button>
                                ` : `
                                    <span style="font-size: 10px; color: #64748b;">(Cần giữ 1 pet)</span>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- CỘT KHO LƯU TRỮ (MAX 30) -->
                <div class="box-panel">
                    <div class="box-panel-header">
                        <span>📦 KHO LƯU TRỮ HOÀNG GIA</span>
                        <span style="color: #cbd5e1; font-size: 12px;">${box.length}/30 Sủng vật</span>
                    </div>
                    <div class="box-pet-list">
                        ${box.length > 0 ? box.map((m, idx) => `
                            <div class="box-pet-card">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 36px; height: 36px; background: #020617; border: 1px solid #334155; border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        <canvas class="box-pet-canvas" data-sprite="${m.spriteKey || 'npc2_1'}" width="32" height="32"></canvas>
                                    </div>
                                    <div>
                                        <div style="font-weight: 800; color: #f8fafc; font-size: 13px;">${m.name} <span style="color: #f59e0b; font-size: 11px;">Lv.${m.level || 5}</span></div>
                                        <div style="font-size: 11px; color: #94a3b8;">Hệ: <strong style="color: ${m.color || '#38bdf8'}">${m.type}</strong></div>
                                    </div>
                                </div>
                                ${team.length < 6 ? `
                                    <button class="btn-pet-action primary" style="padding: 4px 10px; font-size: 11px;" onclick="window.menuManager.withdrawPetFromBox(${idx})">
                                        Rút Đội 📤
                                    </button>
                                ` : `
                                    <span style="font-size: 10px; color: #ef4444;">(Đội đã đầy)</span>
                                `}
                            </div>
                        `).join('') : `
                            <div style="text-align: center; padding: 40px 10px; color: #64748b; font-size: 12px;">
                                Kho lưu trữ hiện đang trống. Hãy gửi sủng vật từ đội hình vào đây khi cần!
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        this.showModal('📦 KHO SỦNG VẬT HOÀNG GIA (STORAGE BOX)', html, 'large');
        setTimeout(() => {
            document.querySelectorAll('.box-pet-canvas').forEach(cv => {
                window.J2MESprite?.renderMonsterAvatar(cv, cv.dataset.sprite || 'npc2_1');
            });
        }, 20);
    }

    depositPetToBox(partyIdx) {
        const team = window.gameState?.playerTeam;
        const box = window.gameState?.storageBox;
        if (!team || !box || team.length <= 1) return;

        const [pet] = team.splice(partyIdx, 1);
        box.push(pet);
        window.soundEngine?.playMenuClick();
        this.showStorageBoxModal();
    }

    withdrawPetFromBox(boxIdx) {
        const team = window.gameState?.playerTeam;
        const box = window.gameState?.storageBox;
        if (!team || !box || team.length >= 6) return;

        const [pet] = box.splice(boxIdx, 1);
        team.push(pet);
        window.soundEngine?.playMenuClick();
        this.showStorageBoxModal();
    }

    // ========================================================
    // ĐẤU TRƯỜNG TRÙM VƯƠNG QUỐC REA J2ME (ROYAL BOSS ARENA)
    // ========================================================
    showBossArenaModal() {
        this.currentModal = 'arena';
        const bosses = window.ROYAL_BOSSES || [];

        const html = `
            <div class="arena-container">
                <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #ef4444; padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <div>
                        <span style="font-weight: 800; color: #fca5a5; font-size: 15px;">⚔️ ĐẤU TRƯỜNG TRÙM VƯƠNG QUỐC (86 STAGES)</span>
                        <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">Trích xuất nguyên bản từ J2ME <code>boss.d</code>: Đối đầu các chiến thần thú có build kỹ năng đặc dị!</div>
                    </div>
                    <span class="arena-badge-level" style="font-size: 12px; padding: 4px 10px;">
                        86 Cấp Trùm
                    </span>
                </div>

                <div class="arena-grid">
                    ${bosses.slice(0, 30).map((b, idx) => `
                        <div class="arena-card">
                            <div class="arena-boss-header">
                                <div style="width: 44px; height: 44px; background: #020617; border: 2px solid #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                    <canvas class="arena-boss-canvas" data-sprite="npc2_${b.monsterId + 1}" width="40" height="40"></canvas>
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 800; color: #f8fafc; font-size: 13px;">#${b.bossIndex + 1} ${b.name}</div>
                                    <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                                        <span class="arena-badge-level">Lv.${b.baseLevel}</span>
                                        <span style="font-size: 11px; color: #cbd5e1;">Hệ: <strong>${b.element}</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div style="font-size: 11px; color: #94a3b8; background: #0b1120; padding: 6px 10px; border-radius: 6px; display: flex; justify-content: space-between;">
                                <span>Thưởng Vàng: <strong style="color: #fbbf24;">+${b.rewardGold}</strong></span>
                                <span>Thưởng EXP: <strong style="color: #38bdf8;">+${b.rewardExp}</strong></span>
                            </div>
                            <button class="btn-arena-fight" onclick="window.menuManager.challengeBoss(${b.bossIndex})">
                                ⚔️ KHIÊU CHIẾN NGAY
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.showModal('⚔️ ĐẤU TRƯỜNG TRÙM HOÀNG GIA (ROYAL ARENA)', html, 'large');
        setTimeout(() => {
            document.querySelectorAll('.arena-boss-canvas').forEach(cv => {
                window.J2MESprite?.renderMonsterAvatar(cv, cv.dataset.sprite || 'npc2_1');
            });
        }, 20);
    }

    challengeBoss(bossIdx) {
        const bosses = window.ROYAL_BOSSES || [];
        const boss = bosses[bossIdx];
        if (!boss) return;

        const team = window.gameState?.playerTeam || [];
        const alivePet = team.find(p => p.hp > 0);
        if (!alivePet) {
            alert('⚠️ Đội hình của bạn đã kiệt sức! Hãy hồi phục sủng vật trước khi khiêu chiến!');
            return;
        }

        const preset = window.MONSTERS_PRESET?.[boss.monsterId] || { name: boss.name, type: boss.element };
        const bossMonster = {
            id: boss.monsterId,
            name: `${boss.name} [TRÙM]`,
            level: boss.baseLevel,
            type: boss.element,
            hp: (preset.baseHp || 80) * (1 + boss.baseLevel * 0.2),
            maxHp: (preset.baseHp || 80) * (1 + boss.baseLevel * 0.2),
            mp: 100,
            maxMp: 100,
            attack: (preset.baseAtk || 20) * (1 + boss.baseLevel * 0.15),
            defense: (preset.baseDef || 15) * (1 + boss.baseLevel * 0.12),
            speed: (preset.baseSpd || 15) * (1 + boss.baseLevel * 0.1),
            spriteKey: `npc2_${boss.monsterId + 1}`,
            skills: ['Tấn công', 'Tất sát', 'Bạo liệt']
        };

        this.closeModal();
        if (window.battleSystem) {
            window.soundEngine?.playBattleStart();
            window.battleSystem.startBattle(alivePet, bossMonster, { isWild: false, isBoss: true });
        }
    }
}

window.menuManager = new MenuManager();


