/**
 * Memory management for calculator
 * Handles memory storage and recall operations
 */

class MemoryManager {
    constructor() {
        this.memory = 0;
        this.isMemorySet = false;
    }
    
    store(value) {
        this.memory = value;
        this.isMemorySet = true;
        this.logMemoryOperation('Store', value);
    }
    
    recall() {
        this.logMemoryOperation('Recall', this.memory);
        return this.memory;
    }
    
    add(value) {
        this.memory += value;
        this.isMemorySet = true;
        this.logMemoryOperation('Add', value);
    }
    
    subtract(value) {
        this.memory -= value;
        this.isMemorySet = true;
        this.logMemoryOperation('Subtract', value);
    }
    
    clear() {
        this.logMemoryOperation('Clear', this.memory);
        this.memory = 0;
        this.isMemorySet = false;
    }
    
    hasStoredValue() {
        return this.isMemorySet && this.memory !== 0;
    }
    
    getMemoryValue() {
        return this.memory;
    }
    
    setMemoryValue(value) {
        this.memory = value;
        this.isMemorySet = true;
    }
    
    logMemoryOperation(operation, value) {
        console.log(`Memory ${operation}: ${value}, Current Memory: ${this.memory}`);
    }
    
    // Additional utility methods
    
    // Save memory to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('calculatorMemory', JSON.stringify({
                memory: this.memory,
                isMemorySet: this.isMemorySet,
                timestamp: new Date().toISOString()
            }));
        } catch (error) {
            console.error('Failed to save memory to storage:', error);
        }
    }
    
    // Load memory from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('calculatorMemory');
            if (stored) {
                const data = JSON.parse(stored);
                this.memory = data.memory;
                this.isMemorySet = data.isMemorySet;
                console.log('Memory loaded from storage:', data);
            }
        } catch (error) {
            console.error('Failed to load memory from storage:', error);
        }
    }
    
    // Clear storage
    clearStorage() {
        try {
            localStorage.removeItem('calculatorMemory');
        } catch (error) {
            console.error('Failed to clear memory storage:', error);
        }
    }
}

// Auto-load memory when class is instantiated
document.addEventListener('DOMContentLoaded', () => {
    // This would be called when the MemoryManager is created in main.js
});