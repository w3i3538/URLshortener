const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

module.exports = (shortenURL_Length) => {
    let result = ""

    for (let i = 1; i <= shortenURL_Length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        const randomChar = characters[randomIndex]
        result += randomChar
    }
    return result
}