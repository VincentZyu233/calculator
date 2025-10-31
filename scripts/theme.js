/**
 * Theme management for the calculator
 * Handles light/dark mode switching and persistence
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeButton();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateThemeButton();
        
        console.log(`Theme changed to: ${this.currentTheme}`);
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));
    }
    
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const colors = {
            light: '#4a90e2',
            dark: '#2d2d2d'
        };
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = colors[theme];
    }
    
    updateThemeButton() {
        const themeButton = document.getElementById('themeToggle');
        const icon = themeButton.querySelector('i');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            themeButton.title = 'Switch to light mode';
        } else {
            icon.className = 'fas fa-moon';
            themeButton.title = 'Switch to dark mode';
        }
    }
    
    saveTheme() {
        try {
            localStorage.setItem('calculatorTheme', this.currentTheme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    }
    
    getSavedTheme() {
        try {
            return localStorage.getItem('calculatorTheme');
        } catch (error) {
            console.error('Failed to load theme preference:', error);
            return 'light';
        }
    }
    
    // Method to set specific theme
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme();
            this.updateThemeButton();
        }
    }
    
    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Detect system preference
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Sync with system theme
    syncWithSystem() {
        const systemTheme = this.detectSystemTheme();
        this.setTheme(systemTheme);
    }
}

// Listen for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        const themeManager = window.calculatorApp?.theme;
        if (themeManager && themeManager.getSavedTheme() === null) {
            themeManager.syncWithSystem();
        }
    });
}