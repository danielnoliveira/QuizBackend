const Students = require('../controllers/Students');
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
const studentMockExample = {
    registration:'385386',
    quiz_finished:5,
    questions_rights:25,
    questions_wrongs:20
}
const studentMockExampleArray = [
    {
        registration:'385386',//20 2ª
        quiz_finished:10,
        questions_rights:40,
        questions_wrongs:10,
        elo:20
    },
    {
        registration:'385387',//4 5ª
        quiz_finished:5,
        questions_rights:18,
        questions_wrongs:7,
        elo:4
    },
    {
        registration:'385388',//12 4ª
        quiz_finished:12,
        questions_rights:44,
        questions_wrongs:16,
        elo:12
    },
    {
        registration:'385389',//15 3ª
        quiz_finished:3,
        questions_rights:15,
        questions_wrongs:0,
        elo:15
    },
    {
        registration:'385390',//30 1ª
        quiz_finished:9,
        questions_rights:40,
        questions_wrongs:5,
        elo:30
    }  
];
describe('Criação de usuario',()=>{
    afterEach( async () => {
        await connection('students').del();
    });
    test('Testando criação de usuario com todos os parâmetros', async () => {
        const req = mockRequest();
        req.body = {
            registration:'389386',
        }
        const res = mockResponse();
        const {id} = (await Students.create(req,res)).result;
        const studentExpect = (await connection('students').where({...req.body}).select())[0];
        expect(id).toBe(studentExpect.id);
    });
});
describe('Atualização de entidade',()=>{
    afterEach( async () => {
        await connection('students').del();
    });
    test('Atualização dos atributos da entidade Student:quiz_finished true,questions_rights e questions_wrongs',async()=>{
        const req = mockRequest();
        req.body = {
            registration:'385386',
            quiz_finished:true,
            questions_rights:10,
            questions_wrongs:5
        }
        await connection('students').insert(studentMockExample);
        const res = mockResponse();
        const {operationStatus} = (await Students.update(req,res)).result;
        const studentRow = (await connection('students').where({registration:req.body.registration}).select().first());
        expect(operationStatus).toBe(true);
        expect(studentRow.registration).toBe(req.body.registration);
        expect(studentRow.quiz_finished).toBe(studentMockExample.quiz_finished+1);
        expect(studentRow.questions_rights).toBe(studentMockExample.questions_rights+req.body.questions_rights);
        expect(studentRow.questions_wrongs).toBe(studentMockExample.questions_wrongs+req.body.questions_wrongs);
    });
    test('Atualização dos atributos da entidade Student:quiz_finished false,questions_rights e questions_wrongs',async()=>{
        const req = mockRequest();
        req.body = {
            registration:'385386',
            quiz_finished:false,
            questions_rights:10,
            questions_wrongs:5
        }
        await connection('students').insert(studentMockExample);
        const res = mockResponse();
        const {operationStatus} = (await Students.update(req,res)).result;
        const studentRow = (await connection('students').where({registration:req.body.registration}).select().first());
        expect(operationStatus).toBe(true);
        expect(studentRow.registration).toBe(req.body.registration);
        expect(studentRow.quiz_finished).toBe(studentMockExample.quiz_finished);
        expect(studentRow.questions_rights).toBe(studentMockExample.questions_rights+req.body.questions_rights);
        expect(studentRow.questions_wrongs).toBe(studentMockExample.questions_wrongs+req.body.questions_wrongs);
    });
});
describe('Rank\'s Students',()=>{
    beforeAll(async () => {
        await connection('students').insert(studentMockExampleArray);
    });
    afterAll( async () => {
        await connection('students').del();
    });
    // form: Elo: (questions_rights*1)-(questions_wrongs*2)
    test('Formação do ranking dos alunos', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const ranking = (await Students.ranking(req,res)).result;
        expect(ranking[0].registration).toBe(studentMockExampleArray[4].registration);
        expect(ranking[1].registration).toBe(studentMockExampleArray[0].registration);
        expect(ranking[2].registration).toBe(studentMockExampleArray[3].registration);
        expect(ranking[3].registration).toBe(studentMockExampleArray[2].registration);
        expect(ranking[4].registration).toBe(studentMockExampleArray[1].registration);
    });
    test('A posição de um determinado aluno no ranking',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            registration:'385389'
        }
        const results = (await Students.myRanking(req,res)).result;
        expect(results.position).toBe(3);
        expect(results.elo).toBe(15);
    });
});
