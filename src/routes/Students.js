const controller = require('../controllers/Students');

module.exports = (router)=>{
    router.route('/students/create').post(controller.create);
    router.route('/students/update').post(controller.update);
    router.route('/students/ranking').get(controller.ranking);
    router.route('/students/myRanking').get(controller.myRanking);

};