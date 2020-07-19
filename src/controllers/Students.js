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
    
    update: async (req,res) => {
        const {registration,quiz_finished,questions_rights,questions_wrongs} = req.body;
        const student = await connection('students').where({registration}).select().first();
        const qf = (quiz_finished?1:0)+student.quiz_finished;
        const qr = questions_rights+student.questions_rights;
        const qw = questions_wrongs+student.questions_wrongs;
        const response = await connection('students')
        .where({registration})
        .update({
            quiz_finished:qf,
            questions_rights:qr,
            questions_wrongs:qw
        });
        return res.status(200).json({operationStatus:true});
    }
}