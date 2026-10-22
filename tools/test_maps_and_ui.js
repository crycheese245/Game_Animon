import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Kiểm tra maps.js
const mapsJsContent = fs.readFileSync(path.join(__dirname, '../client/js/data/maps.js'), 'utf8');

// Giả lập môi trường window để nạp maps.js
const sandbox = {
    window: {},
    Image: class { constructor() { this.src = ''; } }
};
const evalCode = new Function('window', 'Image', mapsJsContent);
evalCode(sandbox.window, sandbox.Image);

const MAPS_CONFIG = sandbox.window.MAPS_CONFIG;
const WORLD_MAP_REGIONS = sandbox.window.WORLD_MAP_REGIONS;

console.log('--- KIỂM TRA MAPS_CONFIG ---');
console.log(`Tổng số map cấu hình: ${Object.keys(MAPS_CONFIG).length}`);

let portalCount = 0;
let errors = [];

for (const [mapId, map] of Object.entries(MAPS_CONFIG)) {
    if (!map.id || !map.name) {
        errors.push(`Map ${mapId} thiếu id hoặc name!`);
    }
    if (map.portals && map.portals.length > 0) {
        map.portals.forEach((p, idx) => {
            portalCount++;
            if (!MAPS_CONFIG[p.targetMap]) {
                errors.push(`Portal #${idx} "${p.name}" của map ${mapId} trỏ tới targetMap không tồn tại: ${p.targetMap}`);
            } else {
                const target = MAPS_CONFIG[p.targetMap];
                if (p.targetPlayerPos.x < 0 || p.targetPlayerPos.x > target.width ||
                    p.targetPlayerPos.y < 0 || p.targetPlayerPos.y > target.height) {
                    errors.push(`Portal #${idx} "${p.name}" của map ${mapId} có targetPlayerPos vượt ngoài kích thước map đích!`);
                }
            }
        });
    }
}

console.log(`Tổng số cổng liên kết (Portals): ${portalCount}`);

console.log('\n--- KIỂM TRA TÍNH TOÀN VẸN 2 CHIỀU CỦA CÁC CỔNG ---');
const bidirectionalChecks = [
    ['map_0', 'map_1'],
    ['map_1', 'map_11'],
    ['map_1', 'map_2'],
    ['map_1', 'map_43'],
    ['map_2', 'map_3'],
    ['map_2', 'map_4'],
    ['map_2', 'map_8'],
    ['map_2', 'map_59'],
    ['map_11', 'map_5'],
    ['map_11', 'map_12'],
    ['map_11', 'map_16'],
    ['map_5', 'map_6'],
    ['map_6', 'map_10'],
    ['map_10', 'map_52'],
    ['map_12', 'map_28'],
    ['map_28', 'map_48'],
    ['map_48', 'map_49'],
    ['map_49', 'map_24']
];

bidirectionalChecks.forEach(([from, to]) => {
    const hasForward = MAPS_CONFIG[from]?.portals?.some(p => p.targetMap === to);
    const hasBackward = MAPS_CONFIG[to]?.portals?.some(p => p.targetMap === from);
    if (!hasForward) errors.push(`Thiếu cổng đi từ ${from} -> ${to}`);
    if (!hasBackward) errors.push(`Thiếu cổng quay về từ ${to} -> ${from}`);
    console.log(`[${from}] <---> [${to}]: ${hasForward && hasBackward ? '✅ ĐỒNG BỘ 2 CHIỀU' : '❌ LỖI'}`);
});

console.log('\n--- KIỂM TRA WORLD_MAP_REGIONS (TOWN MAP POKEMON) ---');
console.log(`Tổng số vùng đại lục: ${WORLD_MAP_REGIONS.length}`);
WORLD_MAP_REGIONS.forEach(reg => {
    if (!MAPS_CONFIG[reg.mapId]) {
        errors.push(`Vùng ${reg.name} có mapId không tồn tại: ${reg.mapId}`);
    }
    if (reg.gridX < 0 || reg.gridX > 6 || reg.gridY < 0 || reg.gridY > 5) {
        errors.push(`Vùng ${reg.name} có tọa độ lưới vượt ngoài 7x6: (${reg.gridX}, ${reg.gridY})`);
    }
    reg.connectedTo.forEach(cid => {
        if (!WORLD_MAP_REGIONS.some(r => r.id === cid)) {
            errors.push(`Vùng ${reg.name} có liên kết đến vùng id không tồn tại: ${cid}`);
        }
    });
});

console.log('\n--- KIỂM TRA INDEX.HTML & GIAO DIỆN ---');
const indexHtml = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf8');
if (!indexHtml.includes('id="btn-ingame-worldmap"')) {
    errors.push('client/index.html thiếu nút btn-ingame-worldmap!');
} else {
    console.log('✅ client/index.html có nút btn-ingame-worldmap');
}

if (errors.length > 0) {
    console.error('\n❌ PHÁT HIỆN LỖI:');
    errors.forEach(e => console.error('- ' + e));
    process.exit(1);
} else {
    console.log('\n🎉 TẤT CẢ KIỂM THỬ ĐỀU ĐẠT CHUẨN XUẤT SẮC! KHÔNG CÓ LỖI!');
}
