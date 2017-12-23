export function generateDocId(){
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++){
        result += str.charAt(Math.floor(Math.random()*str.length))
    }
    return result;
}