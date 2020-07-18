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

afterEach( async () => {
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
