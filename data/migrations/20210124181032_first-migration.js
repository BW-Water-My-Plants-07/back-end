exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      /**
       * user_id
       * username, req unique
       * phoneNumber, req valid
       * password, req
      */
      users.increments('user_id')
      users.string('username', 128).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('phoneNumber').notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', plants => {
      /**
       * id
       * nickname
       * species
       * h2oFrequency
       * image (optional)
      */
      plants.increments('plant_id')
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      plants.string('nickname', 128).notNullable()
      plants.string('species', 200).notNullable()
      plants.enu('h2oFrequency', [ 'none', 'daily', 'twice a week', 'weekly', 'every two weeks', 'every three weeks', ]).notNullable()
      plants.string('image') // PATH or LINK to image (string)
      plants.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
