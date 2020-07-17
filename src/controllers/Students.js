const connection = require('../database/config');

module.exports = {
    create: async (req,res)=>{

        const [id] = await connection('students').insert({
            
        });
    }
}