const mongoose = require("mongoose");
const Notifiche = require("../models/Notifiche");
const Operatore = require("../models/User");

class NotificheService {
    constructor() {
        this.notificheModel = mongoose.model("Notifiche", Notifiche);
        this.operatoreModel = mongoose.model("Operatore", Operatore);
    }

    async getNotifiche() {
        const query = this.notificheModel.find();

        const notifiche = await query
            .populate("operatore")
            .exec();

        // console.log("notifiche: ", notifiche);

        if (notifiche && notifiche.length > 0) {
            for (let i = 0; i < notifiche.length; i++) {
                notifiche[i].operatore = await this.operatoreModel.findById(notifiche[i].operatore._id);
            }
            return notifiche;
        } else {
            console.log("Nessuna notifica trovata nel db");
            return null;
        }
    }

    getNotificheCount() {
        const query = this.notificheModel.find();

        return query.count();
    }
}

module.exports = new NotificheService();