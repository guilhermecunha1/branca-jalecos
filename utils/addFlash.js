async function addFlash(req, res, type, msg) {
    req.session.flash = {type, msg}
}

module.exports = addFlash