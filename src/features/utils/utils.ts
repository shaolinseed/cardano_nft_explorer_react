export const validateAlphaNumeric = (str: string): boolean => {
    return /^[A-Za-z0-9]*$/.test(str);
}

export const validateRewardAddress = (str: string): boolean => {
    return /^addr1[A-Za-z0-9$]*$/.test(str);
}

// Confirm handle contains alphanumeric + . - _ and starts with $
export const validateHandle = (str: string): boolean => {
    return /^\$([A-Za-z0-9_\.-]){2,16}$/.test(str);
    
}



