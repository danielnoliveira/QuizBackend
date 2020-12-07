const QuizController = require('../controllers/Quiz');


module.exports = (router) => {
    router.route('/get10questions').get(QuizController.madeQuiz);
}