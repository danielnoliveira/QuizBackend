const Questions = require('../controllers/Questions');
const connection = require('../database/config');
const mockRequest = () => {
    const req = {}
    req.body = {};
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = (status) =>{
        return res;
    };
    res.json = (result) => {
        res.result = result;
        return res;
    };
    return res;
};
const questionMockQuiz = [
    {
        question:'Quanto é 1+1?',
        answer:'2',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {   
        url_img:'https://www.google.com.br/images/asd5a5sd4a65d6a5sd65ad6a4.png',
        question:'Quanto é bola+triangulo?',
        answer:'4ª dimensão',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 6+1?',
        answer:'7',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0',
        answer_fake4:'Ola deus'
    },
    {
        question:'Quanto é 111+1?',
        answer:'112',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 1+1?',
        answer:'2',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 21+1?',
        answer:'22',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 1+80?',
        answer:'81',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 10+10?',
        answer:'20',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Quanto é 5+1?',
        answer:'6',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
    {
        question:'Dois pontinhos brancos na neve?',
        answer:'Mais neve',
        answer_fake1:'3',
        answer_fake2:'Algo entre 0 e 1000000000',
        answer_fake3:'0'
    },
];
describe('Teste com criação de questões',()=>{
    
    afterAll( async () => {
        await connection('questions').del();
    });
    test('Criação de uma questão no banco de dados sem imagem e com 4 respostas', async () => {
        const req = mockRequest();
        req.body = {
            question:'Quanto é 1+1?',
            answer:'2',
            answer_fake1:'3',
            answer_fake2:'Algo entre 0 e 1000000000',
            answer_fake3:'0'
        };
        const res = mockResponse();
        const {id} = (await Questions.create(req,res)).result;
        const questionExpect = (await connection('questions').where({...req.body}).select())[0]; 
        expect(id).toBe(questionExpect.id);
    });
    test('Criação de uma questão no banco de dados com imagem e com 4 respostas', async () => {
        const req = mockRequest();
        req.body = {
            url_img:'https://www.google/images/22626103203151651651849889895956.png',
            question:'Quanto é 1+1?',
            answer:'2',
            answer_fake1:'3',
            answer_fake2:'Algo entre 0 e 1000000000',
            answer_fake3:'0'
        };
        const res = mockResponse();
        const {id} = (await Questions.create(req,res)).result;
        const questionExpect = (await connection('questions').where({...req.body}).select())[0]; 
        expect(id).toBe(questionExpect.id);
    });
    test('Criação de uma questão no banco de dados com imagem e com 5 respostas', async () => {
        const req = mockRequest();
        req.body = {
            url_img:'https://www.google/images/22626103203151651651849889895956.png',
            question:'Quanto é 1+1?',
            answer:'2',
            answer_fake1:'3',
            answer_fake2:'Algo entre 0 e 1000000000',
            answer_fake3:'0',
            answer_fake4:'Não sei'
        };
        const res = mockResponse();
        const {id} = (await Questions.create(req,res)).result;
        const questionExpect = (await connection('questions').where({...req.body}).select())[0]; 
        expect(id).toBe(questionExpect.id);
    });
    test('Criação de uma questão no banco de dados sem imagem e com 5 respostas', async () => {
        const req = mockRequest();
        req.body = {
            question:'Quanto é 1+1?',
            answer:'2',
            answer_fake1:'3',
            answer_fake2:'Algo entre 0 e 1000000000',
            answer_fake3:'0',
            answer_fake4:'não sei'
        };
        const res = mockResponse();
        const {id} = (await Questions.create(req,res)).result;
        const questionExpect = (await connection('questions').where({...req.body}).select())[0]; 
        expect(id).toBe(questionExpect.id);
    });
});

describe('Pegando X questões para os testes',()=>{
    beforeAll(async ()=>{
        await connection('questions').insert(questionMockQuiz);
    });
    afterAll(async ()=>{
        await connection('questions').del();
    })
    test('5 questões', async() => {
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            question_quant:5
        }
        const {quiz} = (await Questions.getQuiz(req,res)).result;
        const quizMock = questionMockQuiz.slice(0,5);
        expect(quiz[0].question).toBe((quizMock[0]).question);
        expect(quiz[1].question).toBe((quizMock[1]).question);
        expect(quiz[2].question).toBe((quizMock[2]).question);
        expect(quiz[3].question).toBe((quizMock[3]).question);
        expect(quiz[4].question).toBe((quizMock[4]).question);
    })
    
});