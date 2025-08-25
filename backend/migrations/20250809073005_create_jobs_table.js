exports.up = function (knex) {
    return knex.schema.createTable('jobs', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('company').notNullable();
        table.string('location');
        table.string('description');
        table.string('job_type'); // was jobType
        table.string('logo_url');
        table.integer('salary_min'); // was salaryMin
        table.integer('salary_max'); // was salaryMax
        table.date('deadline');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('jobs');
};
