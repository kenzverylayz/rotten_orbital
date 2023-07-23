function passwordregex(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    return regex.test(password)
}

module.exports = passwordregex