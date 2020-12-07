const questions = require('../database/questions');

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = {
    madeQuiz: (req, res) => {
        const ShuffleQuestions = (shuffle(questions)).slice(0, 10);
        return res.status(200).json({ quiz: ShuffleQuestions });
    }
}