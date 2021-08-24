exports.seed = async function (knex) {
    // await knex('users').truncate()
    await knex('plants').truncate()

    await knex('users').insert([
        {
            username: 'nora',
            password: 'flowerfairyprincess',
            phoneNumber: '9703673043'
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