const mongoose = require('mongoose')
const Yup = require("yup")

mongoose.connect('mongodb+srv://Iuri:admin123@cluster0.ndtwj.mongodb.net/test')

const ControllerLog = {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: 'Erro ao validar os campos' })
    }

    const { email, senha } = req.body

    const User = await User.findOne({ email })

    if (!User) {
      return res.status(401).json({ mensagem: 'Usuario nao encontrado' })
    }

    if (!(await User.comparePassword(senha))) {
      return res.status(401).json({ mensagem: 'senha nao confere' })
    }

    //   const { _id } = user
    //   return res.status(201).json({
    //     token: jwt.sign({ _id, email }, authConfig.secret, {
    //       expiresIn: authConfig.expiresIn,
    //     }),
    //   })
    // }
  }
}

module.exports = ControllerLog;