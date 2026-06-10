async function addFlash(req, type, msg) {
    req.session.flash = {type, msg}
}

module.exports = addFlash