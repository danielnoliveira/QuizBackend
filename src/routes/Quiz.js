const QuizController = require('../controllers/Quiz');


module.exports = (router) => {
    router.route('/quiz/made').get(QuizController.madeQuiz);
}