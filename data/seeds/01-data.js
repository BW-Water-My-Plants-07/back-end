exports.seed = async function (knex) {
    // await knex('users').truncate()
    await knex('plants').truncate()

    await knex('users').insert([
        {
            username: 'nora',
            password: '$2a$08$YVcmUvuYzh36MwHYRwTJQuxpoB7MfRWyVOVIXlbh805qsVY7r062K',
            phoneNumber: '9701112222'
        },
    ])
    await knex('plants').insert([
        {
            user_id: 1,
            nickname: 'fluffy',
            species: 'asparagus fern',
            h2oFrequency: 'twice a week',
            image: 'https://cdn.shopify.com/s/files/1/2722/8276/products/asparagusfernshutterstock_1614790711_1200x1200.jpg?v=1616096791'
        }
    ])
}