
exports.up = async function(knex) {
  await knex.schema.createTable('students',(table)=>{
      table.increments('id').primary();
      table.string('registration').notNullable();
      table.integer('quiz_finished').notNullable();
      table.integer('questions_rights').notNullable();
      table.integer('questions_wrongs').notNullable();
  });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('students');
};
