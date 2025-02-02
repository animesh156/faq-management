const  AdminBro = require('admin-bro')
const AdminBroExpressjs = require('@admin-bro/express')
const {buildRouter} = require('@admin-bro/express')
const FAQ = require('../model/FAQModel')

AdminBro.registerAdapter(require('@admin-bro/mongoose'))

const adminBro = new AdminBro(
    {
        resources: [{
            resource: FAQ,
            options: {
                properties: {
                    answer: {
                        type: 'richtext',
                        isRequired: true,
                    }
                }
            }
        }],
        rootPath: '/admin'
    }
);

const router = AdminBroExpressjs.buildRouter(adminBro)
module.exports = router;