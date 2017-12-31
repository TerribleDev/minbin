export function generateDocId() {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));
    }
    return result;
}

export function getLanguage(title?: string) {
    let language = null;
    if (title) {
      const split = title.split(".");
      if (split.length === 2) {
        language = split[1];
      }
    }
    return language;
}
