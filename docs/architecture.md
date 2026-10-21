# Architecture Overview

This document details the architecture of the Game Animon project, including folder structure and module responsibilities.

## Folder Structure

```
/
├── data/                 # Game data files (e.g., battle zones, collision data)
│   ├── battleZones.js
│   └── collisions.js
├── docs/                 # Documentation files
│   ├── asset-integration.md
│   ├── asset-inventory.md
│   ├── development-status.md
│   └── architecture.md
├── img/                  # Image assets (sprites, backgrounds, UI elements)
├── tools/                # Utility scripts and tools
│   └── j2me-extracted/   # Extracted assets from J2ME versions
│       ├── asset-manifest.json
│       └── extract-and-manifest.cmd
├── classes.js            # Core game classes (Pokemon, Battle, etc.)
├── index.html            # Main HTML file for the game entry point
├── main.js               # Main JavaScript file, initializes the game
├── package.json          # Project dependencies and scripts
└── style.css             # CSS for styling the game interface
```

## Module Responsibilities

*   **`data/`**: Contains static game data that defines game elements, such as battle zone configurations, collision maps, and potentially other game parameters.
*   **`docs/`**: Houses all project documentation, including guides, status reports, and architectural overviews.
*   **`img/`**: Stores all visual assets used within the game.
*   **`tools/`**: Includes scripts and utilities for development, such as asset extraction or conversion tools.
*   **`classes.js`**: Defines the core object-oriented structures of the game, such as `Pokemon`, `BattleManager`, `Player`, etc.
*   **`index.html`**: The primary HTML document that loads the game and its assets.
*   **`main.js`**: The entry point of the application. It initializes the game engine, loads necessary modules, and starts the game loop.
*   **`package.json`**: Manages project dependencies, scripts for building, testing, and running the application.
*   **`style.css`**: Provides styling for the game's user interface elements displayed in the browser.
