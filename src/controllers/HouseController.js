import * as Yup from "yup"
import House from "../models/House"
import User from "../models/User"
class HouseController {
    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        })


        const { thumbnail } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação!" })
        }

        const house = await House.create({
            user: user_id,
            // thumbnail,
            description,
            price,
            location,
            status
        })

        return res.json(house)
    }

    async index(req, res) {
        const { status } = req.query

        const houses = await House.find({ status })
        return res.json(houses)
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        })

        const { house_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação!" })
        }

        const user = User.findById(user_id)

        const findHouse = await House.findById(house_id)

        if (user._id !== findHouse.user) {
            return res.status(401).json({ error: "Não autorizado!" })
        }

        const house = await House.updateOne({ _id: house_id }, {
            user: user_id,
            description,
            price,
            location,
            status
        })
        return res.json(house)
    }

    async destroy(req, res) {
        const { house_id } = req.params
        const { user_id } = req.headers

        const user = await User.findById(user_id)

        const findHouse = await House.findById(house_id)

        if (user._id !== findHouse.user) {
            return res.status(401).json({ error: "Não autorizado!" })
        }

        await House.deleteOne({ _id: house_id })
        return res.json({ message: "Excluida com sucesso!" })
    }

    async show(req, res) {
        const { user_id } = req.headers


        const houses = await House.find({ user: user_id })

        return res.json(houses)
    }
}

export default new HouseController()