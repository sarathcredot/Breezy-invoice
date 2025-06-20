

import { User } from "../../DB/model/user.js";


export const userService = {


    createUser: (userData) => {

        return new Promise(async (resolve, reject) => {

            try {

                const exitUser = await User.findOne({ number: userData.number })
                if (exitUser) {
                    resolve()
                } else {

                    const final = new User(userData)
                    await final.save()
                    resolve()
                }

            } catch (error) {
                reject(error)
            }
        })
    }
}