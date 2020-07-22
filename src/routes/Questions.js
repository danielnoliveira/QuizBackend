const controller = require('../controllers/Questions');

module.exports = (router)=>{
    router.route('/questions/create').post(controller.create);
    router.route('/questions/quiz').get(controller.getQuiz);
};