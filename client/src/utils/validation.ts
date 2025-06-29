export const validatePassword = (password: string): { valid: boolean, message?: string } => {
    if (password.length < 8)
        return { valid: false, message: 'Password must be at least 8 characters long' }
    if (password.length > 30)
        return { valid: false, message: 'Password must be at most 30 characters long' }
    if (!/[A-Z]/.test(password))
        return { valid: false, message: 'Password must contain at least one uppercase letter' }
    if (!/[a-z]/.test(password))
        return { valid: false, message: 'Password must contain at least one lowercase letter' }
    if (!/[0-9]/.test(password))
        return { valid: false, message: 'Password must contain at least one digit' }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return { valid: false, message: 'Password must contain at least one special character' }
    return { valid: true }
}

export const validateName = (name: string): { valid: boolean, message?: string } => {
    const trimmed = name.trim()
    if (!trimmed)
        return { valid: false, message: 'Name is required' }
    if (trimmed.length < 2)
        return { valid: false, message: 'Name must be at least 2 characters long' }
    if (/[0-9]/.test(name))
        return { valid: false, message: 'Name cannot contain numbers' }
    if (!/^[A-ZÀ-Ý][a-zà-ý'’-]*(?:[\s-][A-ZÀ-Ý][a-zà-ý'’\.-]*)*$/.test(trimmed))
        return {
            valid: false,
            message: 'Name must be properly formatted (Each part must start with uppercase, can contain hyphens, apostrophes, or periods for initials)'
        }
    return { valid: true }
}

export const validateEmail = (email: string): { valid: boolean, message?: string } => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email) 
        ? { valid: true } 
        : { valid: false, message: 'Please enter a valid email address' }
}

export const validatePasswordsMatch = (password: string, repeatPassword: string) => password === repeatPassword ? { valid: true } : { valid: false, message: 'Passwords do not match' }

export const formatName = (input: string): string => {
    return input
        .trim()
        .split(/\s+/)
        .map(word => {
            // Handle hyphenated names (e.g., "anne-marie" -> "Anne-Marie")
            if (word.includes('-')) {
                return word.split('-')
                    .map(part => formatWordPart(part))
                    .join('-')
            }
            return formatWordPart(word)
        })
        .join(' ')
}

const formatWordPart = (part: string): string => {    
    // Preserve existing initials (e.g., "J.R.R." remains unchanged)
    if (/^[A-Za-z]\.+$/.test(part)) {
        return part.toUpperCase()
    }
    
    // Handle apostrophes (e.g., "o'reilly" -> "O'Reilly")
    if (part.includes("'")) {
        return part.split("'")
            .map((sub, i) => i === 0 
                ? formatBaseName(sub)
                : sub.toLowerCase())
            .join("'")
    }
    
    return formatBaseName(part)
}

const formatBaseName = (name: string): string => {
    if (!name) return name
    
    const lowerName = name.toLowerCase()
    
    // Handle Mc/Mac prefixes
    if (lowerName.startsWith('mc') && name.length > 2) {
        return 'Mc' + name[2].toUpperCase() + name.slice(3).toLowerCase()
    }
    if (lowerName.startsWith('mac') && name.length > 3) {
        return 'Mac' + name[3].toUpperCase() + name.slice(4).toLowerCase()
    }
    
    // Handle other prefixes
    const prefixes = ['van', 'de', 'der', 'la', 'le']
    if (prefixes.includes(lowerName)) {
        return name[0].toUpperCase() + name.slice(1).toLowerCase()
    }
    
    // Default capitalization
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
}
