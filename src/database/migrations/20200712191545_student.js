
exports.up = async function(knex) {
  await knex.schema.createTable('students',(table)=>{
      table.increments('id').primary();
      table.string('registration').notNullable();
      table.integer('quiz_finished').notNullable().defaultTo(0);
      table.integer('questions_rights').notNullable().defaultTo(0);
      table.integer('questions_wrongs').notNullable().defaultTo(0);
      table.integer('elo').notNullable().defaultTo(0);
  });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('students');
};
