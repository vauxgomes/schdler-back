// https://stackoverflow.com/questions/14738212/add-intentional-latency-in-express

module.exports = (req, res, next) => {
    setTimeout(next, 2500)
}
