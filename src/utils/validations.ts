export class EmailValidations{
    public static validateEmail(email: string): boolean {
        // Validación más estricta de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
}

