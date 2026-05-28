export const validateEmail =(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials=(title)=>{
    if(!title) return "";

    const words = title.split(" ");
    let initials="";
    for(let i=0; i<Math.min(words.length,2);i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let score = 0;
    if (password.length > 0) score++;
    if (minLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    let strength = "weak";
    if (score >= 5) strength = "strong";
    else if (score >= 3) strength = "fair";

    return {
        isValid: minLength && hasUpper && hasNumber && hasSpecial,
        strength,
        score,
        requirements: {
            minLength,
            hasUpper,
            hasNumber,
            hasSpecial
        }
    };
};