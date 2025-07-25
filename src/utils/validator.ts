export class Validator {
  public static emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static phoneRegEx = /^\+?[1-9]\d{1,14}$/;
  
  static matchRegEx(value: string, regEx: RegExp) {
    return regEx.test(value);
  }

  
  static isValidEmail(email: string): boolean {
    return Validator.emailRegEx.test(email);
  }
  
  static isValidPhone(phone: string): boolean {
    return Validator.phoneRegEx.test(phone);
  }
  
  static isStringType(value: any): boolean {
    return typeof value == "string";
  }
  
  static isShortLength(value: string, minLength: number): boolean {
    return value.length < minLength;
  }
  
  static isLongLength(value: string, maxLength: number): boolean {
    return value.length > maxLength;
  }
  
  static isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/; 
    return nameRegex.test(name);
  }
  
  static isValidDateRange(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    return start >= today && end > start;
  }
}