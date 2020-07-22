const connection = require('../database/config');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname+'/../src/database/', 'test.sqlite');
module.exports = {
    create: async (req,res)=>{
        const {registration} = req.body;
        const [id] = await connection('students').insert({
            registration,
        });

        return res.status(200).json({id});
    },
    
    update: async (req,res) => {
        const {registration,quiz_finished,questions_rights,questions_wrongs} = req.body;
        const student = await connection('students').where({registration}).select().first();
        const qf = (quiz_finished?1:0)+student.quiz_finished;
        const qr = questions_rights+student.questions_rights;
        const qw = questions_wrongs+student.questions_wrongs;
        const addelo = qr-(qw*2);
        const response = await connection('students')
        .where({registration})
        .update({
            quiz_finished:qf,
            questions_rights:qr,
            questions_wrongs:qw,
            elo:addelo
        });
        return res.status(200).json({operationStatus:true,response});
    },

    ranking: async (req,res) => {
        const results = await connection('students').select('registration','elo').orderBy('elo','desc');
        return res.status(200).json(results);
    },
    myRanking: async (req,res)=>{
      const {registration} = req.body;
      const results = await connection('students').select('registration','elo').orderBy('elo','desc');
      var i = -1;
      for (i = 0; i < results.length; i++) {
        if(results[i].registration===registration){
          break;
        }
      }
      return res.status(200).json({...results[i],position:i+1});
    }
}