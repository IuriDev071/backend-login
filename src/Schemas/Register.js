const mongoose = require("mongoose")
const Yup = require("yup")
const User = require("./Mongo")

mongoose.connect('mongodb+srv://Iuri:admin123@cluster0.ndtwj.mongodb.net/test')

const Controller = {

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
            senhaConfirm: Yup.string().required().min(6)
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ mensagem: 'Erro na validação dos campos' })
        }

        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
            return res.status(400).json({ mensagem: 'Usuário já existe no sistema' })
        }

        const { nome, email } = await User.create(req.body)

        return res.status(201).json({ nome, email })
    }
}

module.exports = Controller;