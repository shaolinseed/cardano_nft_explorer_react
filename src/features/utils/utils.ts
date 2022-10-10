export const validateAlphaNumeric = (str: string): boolean => {
    return /^[A-Za-z0-9]*$/.test(str);
}

export const validateRewardAddress = (str: string): boolean => {
    return /^addr1[A-Za-z0-9$]*$/.test(str);
}

export const validateHandle = (str: string): boolean => {
    return /^\$[a-z0-9_\.-]+$/.test(str);
    
}



