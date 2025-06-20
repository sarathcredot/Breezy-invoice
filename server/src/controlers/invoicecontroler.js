

import { invoiceService } from "../services/invoiceservice.js"
import { userService } from "../services/userservice.js"
import { response } from "../utils/responseUtils.js"



export const invoiceControler = {

    generateServiceInvoice: async (req, res) => {


        try {

            console.log("invoice")
            const resevData = JSON.parse(req.body.finalData)
            const userData = {

                name: resevData?.invoiceData.customer.name,
                number: resevData?.invoiceData.customer.mob,
                place: resevData?.invoiceData.customer.address
            }
            // save user data
            await userService.createUser(userData)

            const result = await invoiceService.generateServiceInvoiceService(req)

            response.success(res, result, "invoice ")

        } catch (error) {
            console.log("error", error)
            response.error(res)
        }
    },
    getAllInvoiceItems: async (req, res) => {


        try {

            const result = await invoiceService.getAllInvoiceItems(req)
            response.success(res, result, "invoice items ")


        } catch (error) {

            console.log("error", error)
            response.error(res)
        }
    },
    createInvoiceItems: async (req, res) => {

        try {

            console.log("item create>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

            const result = await invoiceService.createInvoiceItems(req.body)
            response.success(res, result, "invoice items created ")

        } catch (error) {

            console.log("error", error)
            response.error(res)
        }
    },
    deleteInvoiceItem: async (req, res) => {

        try {

            const { itemId } = req.params
            console.log("id", itemId)

            const result = await invoiceService.deleteInvoiceitem(itemId)
            response.success(res, result, "invoice item deleted ")



        } catch (error) {
            console.log("error", error)
            response.error(res)
        }

    }

}

