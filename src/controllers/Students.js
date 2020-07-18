const connection = require('../database/config');

module.exports = {
    create: async (req,res)=>{
        const {registration} = req.body;
        const [id] = await connection('students').insert({
            registration,
            quiz_finished:0,
            questions_rights:0,
            questions_wrongs:0
        });

        return res.status(200).json({id});
    },
    

}