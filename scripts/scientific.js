/**
 * Scientific calculator functions
 * Handles advanced mathematical operations
 */

class ScientificCalculator {
    constructor() {
        this.constants = {
            PI: Math.PI,
            E: Math.E
        };
    }
    
    calculate(operation, value, currentOperand) {
        const number = parseFloat(currentOperand);
        
        if (isNaN(number) && operation !== 'pi' && operation !== 'e') {
            return null;
        }
        
        try {
            switch (operation) {
                case 'sin':
                    return this.sin(number);
                case 'cos':
                    return this.cos(number);
                case 'tan':
                    return this.tan(number);
                case 'log':
                    return this.log(number);
                case 'ln':
                    return this.ln(number);
                case 'sqrt':
                    return this.sqrt(number);
                case 'power':
                    return this.power(number, value);
                case 'inverse':
                    return this.inverse(number);
                case 'factorial':
                    return this.factorial(number);
                case 'percent':
                    return this.percent(number);
                case 'pi':
                    return this.getPi();
                case 'e':
                    return this.getE();
                default:
                    return null;
            }
        } catch (error) {
            console.error('Scientific calculation error:', error);
            return 'Error';
        }
    }
    
    sin(number) {
        return Math.sin(this.toRadians(number));
    }
    
    cos(number) {
        return Math.cos(this.toRadians(number));
    }
    
    tan(number) {
        return Math.tan(this.toRadians(number));
    }
    
    log(number) {
        if (number <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log10(number);
    }
    
    ln(number) {
        if (number <= 0) throw new Error('Natural log of non-positive number');
        return Math.log(number);
    }
    
    sqrt(number) {
        if (number < 0) throw new Error('Square root of negative number');
        return Math.sqrt(number);
    }
    
    power(number, exponent) {
        if (exponent === 'y') {
            // For x^y, we need to handle this differently
            // This would typically require user input for y
            return number; // Placeholder - would need additional input
        }
        return Math.pow(number, parseFloat(exponent));
    }
    
    inverse(number) {
        if (number === 0) throw new Error('Division by zero');
        return 1 / number;
    }
    
    factorial(number) {
        if (!Number.isInteger(number) || number < 0) {
            throw new Error('Factorial requires non-negative integer');
        }
        if (number === 0 || number === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        return result;
    }
    
    percent(number) {
        return number / 100;
    }
    
    getPi() {
        return this.constants.PI;
    }
    
    getE() {
        return this.constants.E;
    }
    
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    
    // Additional scientific functions can be added here
    
    exponential(number) {
        return Math.exp(number);
    }
    
    absolute(number) {
        return Math.abs(number);
    }
    
    // Memory functions for constants
    storeConstant(key, value) {
        this.constants[key] = value;
    }
    
    getConstant(key) {
        return this.constants[key];
    }
}