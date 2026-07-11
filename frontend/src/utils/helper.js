export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
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