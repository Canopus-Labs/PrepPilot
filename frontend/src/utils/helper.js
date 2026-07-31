export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
};

export const getInitials=(title)=>{
    if(!title) return "";

    const words = title.split(" ");
    let initials="";
    for(let i=0; i<Math.min(words.length,2);i++){
        if (!words[i]) continue;
        initials += words[i][0];
    }

    return initials.toUpperCase();
}