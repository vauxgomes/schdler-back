module.exports = {
  //
  async index(request, response) {
    return response.json({ system: 'Schedler Backend', version: '1.0.0' })
  }
}
