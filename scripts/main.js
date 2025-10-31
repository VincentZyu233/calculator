/**
 * Main application controller
 * Handles initialization and coordination between modules
 */

class CalculatorApp {
    constructor() {
        this.calculator = null;
        this.scientific = null;
        this.memory = null;
        this.theme = null;
        
        this.init();
    }
    
    init() {
        // Initialize modules
        this.calculator = new Calculator();
        this.scientific = new ScientificCalculator();
        this.memory = new MemoryManager();
        this.theme = new ThemeManager();
        
        // Setup event listeners
        this.setupEventListeners();
        this.setupKeyboardSupport();
        
        console.log('Calculator app initialized successfully');
    }
    
    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('.num-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const number = e.target.getAttribute('data-number');
                this.calculator.appendNumber(number);
                this.updateDisplay();
            });
        });
        
        // Operation buttons
        document.querySelectorAll('.op-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const operation = e.target.getAttribute('data-operation');
                this.handleOperation(operation);
            });
        });
        
        // Scientific buttons
        document.querySelectorAll('.sci-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const operation = e.target.getAttribute('data-operation');
                const value = e.target.getAttribute('data-value');
                this.handleScientificOperation(operation, value);
            });
        });
        
        // Control buttons
        document.querySelectorAll('.control-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleControlAction(action);
            });
        });
        
        // Memory buttons
        document.querySelectorAll('.memory-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleMemoryAction(action);
            });
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.theme.toggleTheme();
        });
    }
    
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }
    
    handleOperation(operation) {
        switch (operation) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.calculator.chooseOperation(operation);
                break;
            case 'equals':
                this.calculator.calculate();
                break;
        }
        this.updateDisplay();
    }
    
    handleScientificOperation(operation, value) {
        const result = this.scientific.calculate(operation, value, this.calculator.currentOperand);
        if (result !== null) {
            this.calculator.currentOperand = result.toString();
            this.updateDisplay();
        }
    }
    
    handleControlAction(action) {
        switch (action) {
            case 'clear':
                this.calculator.clear();
                break;
            case 'clear-entry':
                this.calculator.clearEntry();
                break;
            case 'backspace':
                this.calculator.delete();
                break;
        }
        this.updateDisplay();
    }
    
    handleMemoryAction(action) {
        switch (action) {
            case 'memory-clear':
                this.memory.clear();
                break;
            case 'memory-recall':
                this.calculator.currentOperand = this.memory.recall().toString();
                break;
            case 'memory-add':
                this.memory.add(parseFloat(this.calculator.currentOperand) || 0);
                break;
            case 'memory-subtract':
                this.memory.subtract(parseFloat(this.calculator.currentOperand) || 0);
                break;
            case 'memory-store':
                this.memory.store(parseFloat(this.calculator.currentOperand) || 0);
                break;
        }
        this.updateMemoryIndicator();
        this.updateDisplay();
    }
    
    handleKeyboardInput(event) {
        const { key } = event;
        
        // Prevent default for calculator keys
        if (this.isCalculatorKey(key)) {
            event.preventDefault();
        }
        
        // Number keys
        if (/[0-9]/.test(key)) {
            this.calculator.appendNumber(key);
        }
        // Decimal point
        else if (key === '.') {
            this.calculator.appendNumber('.');
        }
        // Operators
        else if (key === '+') {
            this.calculator.chooseOperation('add');
        }
        else if (key === '-') {
            this.calculator.chooseOperation('subtract');
        }
        else if (key === '*') {
            this.calculator.chooseOperation('multiply');
        }
        else if (key === '/') {
            event.preventDefault();
            this.calculator.chooseOperation('divide');
        }
        // Enter or equals
        else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            this.calculator.calculate();
        }
        // Escape or clear
        else if (key === 'Escape' || key === 'Delete') {
            this.calculator.clear();
        }
        // Backspace
        else if (key === 'Backspace') {
            this.calculator.delete();
        }
        
        this.updateDisplay();
    }
    
    isCalculatorKey(key) {
        const calculatorKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '.', '+', '-', '*', '/', '=', 'Enter', 'Escape', 'Delete', 'Backspace'
        ];
        return calculatorKeys.includes(key);
    }
    
    updateDisplay() {
        const resultElement = document.getElementById('result');
        const expressionElement = document.getElementById('expression');
        
        resultElement.textContent = this.formatDisplayNumber(this.calculator.currentOperand);
        
        if (this.calculator.previousOperand && this.calculator.operation) {
            const operationSymbol = this.getOperationSymbol(this.calculator.operation);
            expressionElement.textContent = 
                `${this.formatDisplayNumber(this.calculator.previousOperand)} ${operationSymbol}`;
        } else {
            expressionElement.textContent = '';
        }
    }
    
    updateMemoryIndicator() {
        const indicator = document.getElementById('memoryIndicator');
        if (this.memory.hasStoredValue()) {
            indicator.textContent = `M: ${this.memory.recall()}`;
        } else {
            indicator.textContent = '';
        }
    }
    
    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        
        // Handle very large or very small numbers
        if (stringNumber.length > 12) {
            return parseFloat(number).toExponential(6);
        }
        
        // Format with commas for large numbers
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    
    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operation] || operation;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
});