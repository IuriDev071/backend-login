const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authConfig = require('../Controller/auth')
const Yup = require("yup")

const ControllerLog = {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: 'Erro ao validar os campos' })
    }

    console.log(req.body)
    const { email, senha } = req.body

    const User = await User.findOne({ email })

    if (!User) {
      return res.status(401).json({ mensagem: 'Usuario nao encontrado' })
    }

    if (!(await User.comparePassword(senha))) {
      return res.status(401).json({ mensagem: 'senha nao confere' })
    }

    const { _id } = user
    return res.status(201).json({
      token: jwt.sign({ _id, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = ControllerLog;