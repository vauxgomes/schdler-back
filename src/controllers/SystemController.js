module.exports = {
  //
  async index(request, response) {
    return response.json({ system: 'Schdler Backend', version: '1.0.0' })
  }
}
