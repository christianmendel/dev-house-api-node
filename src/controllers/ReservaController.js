import House from "../models/House"
import Reserva from "../models/Reserva"

class ReservaController {
    async store(req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body

        const findHouse = await House.findById(house_id)

        if (!findHouse) {
            return res.status(400).json({ error: "Não existe essa casa!" })
        }

        if (findHouse.status !== true) {
            return res.status(400).json({ error: "Essa casa não está disponivel" })
        }

        const reserva = await Reserva.create({
            user: user_id,
            house: house_id,
            date
        })

        // await reserva.populate('house').populate('user').execPopulate()
        return res.json(reserva)
    }

    async index(req, res) {
        const { user_id } = req.headers

        const reservas = await Reserva.find({ user: user_id }).populate('house')

        return res.json(reservas)
    }

    async destroy(req, res) {
        const { reserva_id } = req.body

        await Reserva.findByIdAndDelete({ _id: reserva_id })

        return res.send()
    }

}

export default new ReservaController()