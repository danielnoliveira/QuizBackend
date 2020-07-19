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
})
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