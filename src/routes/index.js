const Students = require('./Students');
const Questions = require('./Questions');
module.exports = (router)=>{
    Students(router);
    Questions(router);
    return router;
}