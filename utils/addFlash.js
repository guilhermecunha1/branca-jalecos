async function addFlash(req, res, msg) {
    req.session.flash = {type, msg}
}

module.exports = addFlash