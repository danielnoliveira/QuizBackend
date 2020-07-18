const connection = require('../database/config');

module.exports = {
    create:async (req,res)=>{
        const {url_img,question,answer,answer_fake1,answer_fake2,answer_fake3,answer_fake4} = req.body;

        var row = {
            question,
            answer,
            answer_fake1,
            answer_fake2,
            answer_fake3
        }
        if(url_img){
            row.url_img = url_img;
        }
        if(answer_fake4){
            row.answer_fake4 = answer_fake4;
        }
        const [id] = await connection('questions').insert(row);
        return res.status(200).json({id});
    }
}