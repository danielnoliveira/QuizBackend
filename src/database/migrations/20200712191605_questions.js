
exports.up = async function(knex) {
    await knex.schema.createTable('questions',(table)=>{
        table.increments('id').primary();
        table.string('url_img').nullable();
        table.string('question').notNullable();
        table.string('answer').notNullable();
        table.string('answer_fake1').notNullable();
        table.string('answer_fake2').notNullable();
        table.string('answer_fake3').notNullable();
        table.string('answer_fake4').nullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('questions');
};
