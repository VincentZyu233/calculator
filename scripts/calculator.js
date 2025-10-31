/**
 * Basic calculator operations
 * Handles arithmetic operations and number management
 */

class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.shouldResetScreen = false;
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.shouldResetScreen = false;
    }
    
    clearEntry() {
        this.currentOperand = '0';
    }
    
    delete() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }
    
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        
        // Replace initial zero unless it's a decimal point
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }
    
    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.handleError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = this.roundResult(computation).toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }
    
    roundResult(number) {
        // Round to avoid floating point precision issues
        return Math.round(number * 100000000) / 100000000;
    }
    
    handleError(message) {
        this.currentOperand = 'Error';
        this.previousOperand = '';
        this.operation = null;
        this.shouldResetScreen = true;
        
        console.error('Calculator error:', message);
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.clear();
        }, 2000);
    }
    
    // Getters for external access
    getCurrentOperand() {
        return this.currentOperand;
    }
    
    getPreviousOperand() {
        return this.previousOperand;
    }
    
    getOperation() {
        return this.operation;
    }
}