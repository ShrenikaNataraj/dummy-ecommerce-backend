'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Category',
      [
        {
          cat_id: 1,
          name: 'Electronics',
          total: 5,
        },
        {
          cat_id: 2,
          name: 'Jewelery',
          total: 5,
        },
        {
          cat_id: 3,
          name: "Men's clothing",
          total: 5,
        },
        {
          cat_id: 4,
          name:  "Women's clothing",
          total: 5,
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Product',
      [
        {
          p_id: 1,
          name: 'iphone 14 pro max',
          cat_id: 1,
          cat_name:"Electronics",
          price: 1000,
          quantity: 4,
          desc: 'iphone 14 pro max 512GB 8gb 12mp charcoal black ',
          bar_id:1,
        },
        {
          p_id: 2,
          name: 'Sandisk pendrive',
          cat_id: 1,
          cat_name:"Electronics",
          quantity: 3,
          price: 10,
          desc: 'Sandisk pendrive 32GB usb 3.0',
          bar_id:2,
        },
        {
          p_id: 3,
          name: 'Samsung Phone',
          cat_id: 1,
          cat_name:"Electronics",
          quantity: 10,
          price: 200,
          desc: 'Samsung M32 32GB Phone blue',
          bar_id:3,
        },
        {
          p_id: 4,
          name: 'Boat Earphone',
          cat_id: 1,
          cat_name:"Electronics",
          quantity: 10,
          price: 20,
          desc: 'Boat inear earphones extra bass',
          bar_id:4,
        },
        {
          p_id: 5,
          name: 'Logitech keyboard',
          cat_id: 1,
          cat_name:"Electronics",
          quantity: 10,
          price: 30,
          desc: 'Logitech gaming keybaord RGB backlit',
          bar_id:5,
        },
        {
          p_id: 6,
          name: 'Gold Chain',
          cat_id: 2,
          cat_name:"Jewelery",
          price: 1000,
          quantity: 4,
          desc: 'Designer gold chain 24 carat',
          bar_id:6,
        },
        {
          p_id: 7,
          name: 'Silver Chain',
          cat_id: 2,
          cat_name:"Jewelery",
          quantity: 3,
          price: 10,
          desc: 'Designer fashionable silver chain',
          bar_id:7,
        },
        {
          p_id: 8,
          name: 'Gold bangles',
          cat_id: 2,
          cat_name:"Jewelery",
          quantity: 10,
          price: 200,
          desc: '24 carat tanishq brand gold bangles',
          bar_id:8,
        },
        {
          p_id: 9,
          name: 'Pendant',
          cat_id: 2,
          cat_name:"Jewelery",
          quantity: 10,
          price: 20,
          desc: 'Classic diamond pendant bluestone',
          bar_id:9,
        },
        {
          p_id: 10,
          name: 'Earrings',
          cat_id: 2,
          cat_name:"Jewelery",
          quantity: 10,
          price: 300,
          desc: 'Awesome looking fashionable trending gold earrings',
          bar_id:10,
        },
        {
          p_id: 11,
          name: 'Jeans',
          cat_id: 3,
          cat_name:"Men's clothing",
          price: 10,
          quantity: 4,
          desc: 'Blue jeans denim waist 30 inch',
          bar_id:11,
        },
        {
          p_id: 12,
          name: 'Red sweater',
          cat_id: 3,
          cat_name:"Men's clothing",
          price: 10,
          quantity: 4,
          desc: 'Red sweater zudio size large',
          bar_id:12,
        },
        {
          p_id: 13,
          name: 'Chinos',
          cat_id: 3,
          cat_name:"Men's clothing",
          price: 10,
          quantity: 4,
          desc: 'Stylish green chinos waist 32 inch',
          bar_id:13,
        },
        {
          p_id: 14,
          name: 't-shirt',
          cat_id: 3,
          cat_name:"Men's clothing",
          price: 100,
          quantity: 4,
          desc: 'funky t-shirt rainbow color pride month limited edition',
          bar_id:14,
        },
        {
          p_id: 15,
          name: 'Shorts',
          cat_id: 3,
          cat_name:"Men's clothing",
          price: 5,
          quantity: 4,
          desc: 'Gym shorts sweatproof unisex',
          bar_id:15,
        },
        {
          p_id: 16,
          name: 'Jeans',
          cat_id: 4,
          cat_name:"Women's clothing",
          price: 10,
          quantity: 4,
          desc: 'Women black jeans denim waist 28 inch',
          bar_id:16,
        },
        {
          p_id: 17,
          name: 'White sweater',
          cat_id: 4,
          cat_name:"Women's clothing",
          price: 10,
          quantity: 4,
          desc: 'Women white sweater zudio size large',
          bar_id:17,
        },
        {
          p_id: 18,
          name: 'Skirt',
          cat_id: 4,
          cat_name:"Women's clothing",
          price: 10,
          quantity: 4,
          desc: 'Stylish green Skirt waist 32 inch',
          bar_id:18,
        },
        {
          p_id: 19,
          name: 'Top',
          cat_id: 4,
          cat_name:"Women's clothing",
          price: 8,
          quantity: 4,
          desc: 'funky top rainbow color pride month limited edition',
          bar_id:19,
        },
        {
          p_id: 20,
          name: 'sari',
          cat_id: 4,
          cat_name:"Women's clothing",
          price: 50,
          quantity: 4,
          desc: 'Traditional mysore sari',
          bar_id:20,
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     *
     *
     */
    await queryInterface.bulkDelete('Category', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('Product', null, bulkDeleteOptions);
  },
};
