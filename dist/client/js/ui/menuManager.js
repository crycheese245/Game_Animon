// ========================================================
// Quản Lý Màn Hình Menu & Cài Đặt (Menu Manager)
// ========================================================

class MenuManager {
    constructor() {
        this.isInMainMenu = true;
        this.currentModal = null; // 'save_load', 'settings', 'about', 'online', 'char_creation'
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

        // Nút Đội Hình Sủng Vật (Header + Menu)
        document.getElementById('btn-pet-team')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showPetTeamModal();
        });
        document.getElementById('btn-menu-pets')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showPetTeamModal();
        });

        // Nút Túi Đồ (Header + Menu)
        document.getElementById('btn-inventory')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showBagModal();
        });
        document.getElementById('btn-menu-bag')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showBagModal();
        });

        // Nút Menu trên Header game
        document.getElementById('btn-in-game-menu')?.addEventListener('click', () => {
            window.soundEngine?.playMenuClick();
            this.showMainMenu();
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
    }

    hideCharacterCreation() {
        const charOverlay = document.getElementById('char-creation-overlay');
        if (charOverlay) charOverlay.style.display = 'none';
        this.currentModal = null;
    }

    showMainMenu() {
        this.isInMainMenu = true;
        this.hideCharacterCreation();
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
                                    <div style="width: 44px; height: 44px; background: #0f172a; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                                        <img src="${m.sprite || './img/monsters/npc2_1.png'}" style="width: 38px; height: 38px; object-fit: contain; image-rendering: pixelated;">
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

        let html = `
            <div class="team-container">
                <div class="team-header-bar">
                    <div class="team-count-badge">
                        🐾 Đội Hình Hiện Tại: <strong>${team.length}/6</strong> Sủng Vật
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="bag-tab-btn" onclick="window.menuManager.showBagModal('recovery')">🎒 Dùng Thuốc Hồi Phục</button>
                    </div>
                </div>

                <div class="team-grid">
                    ${team.map((m, idx) => {
                        const hpPct = Math.round((m.hp / m.maxHp) * 100);
                        const mpPct = Math.round((m.mp / m.maxMp) * 100);
                        const isStarter = idx === 0;
                        const elemColor = elemColors[m.type] || '#3498db';
                        const skills = m.skills || [];

                        return `
                            <div class="pet-team-card ${isStarter ? 'starter-active' : ''}">
                                ${isStarter ? '<div class="starter-crown">👑 XUẤT TRẬN ĐẦU</div>' : ''}
                                
                                <div class="pet-main-row">
                                    <div class="pet-avatar-wrap" style="border-color: ${elemColor}">
                                        <img src="${m.sprite || './img/monsters/npc2_1.png'}" alt="${m.name}" class="pet-avatar-img">
                                    </div>

                                    <div class="pet-meta-info">
                                        <div class="pet-name-line">
                                            <span class="pet-name-title">${m.name}</span>
                                            <span class="pet-level-badge">Lv.${m.level || 5}</span>
                                            <span class="pet-elem-badge" style="background: ${elemColor}">${m.type}</span>
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
                                </div>

                                <div class="pet-stats-row">
                                    <span>⚔️ Công: <strong>${m.attack || 15}</strong></span>
                                    <span>🛡️ Thủ: <strong>${m.defense || 12}</strong></span>
                                    <span>⚡ Tốc: <strong>${m.speed || 14}</strong></span>
                                    <span>⭐ Bậc: <strong>${m.tier || 1}</strong></span>
                                </div>

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

                                <div class="pet-card-actions">
                                    ${!isStarter ? `
                                        <button class="btn-pet-action primary" onclick="window.menuManager.setStarterPet(${idx})">
                                            👑 Chọn Xuất Trận Đầu
                                        </button>
                                    ` : `
                                        <div style="flex: 1; text-align: center; font-size: 12px; color: #eab308; font-weight: bold; padding: 6px;">
                                            ✓ Đang là Sủng vật Tiên phong
                                        </div>
                                    `}
                                    <button class="btn-pet-action secondary" onclick="window.menuManager.showBagModal('recovery')">
                                        🧪 Dùng Thuốc
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showModal('🐾 QUẢN LÝ ĐỘI HÌNH SỦNG VẬT', html, 'large');
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
}

window.menuManager = new MenuManager();

