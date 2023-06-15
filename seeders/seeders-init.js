'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Category',
      [
        {
          cat_id: 1,
          name: 'Electronics',
          total: 1,
        },
        {
          cat_id: 2,
          name: 'Dress',
          total: 2,
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Product',
      [
        {
          p_id: 1,
          name: 'Vero Moda',
          cat_id: 2,
          price: 24,
          quantity: 4,
          desc: 'Vero Moda Crop Top',
        },
        {
          p_id: 2,
          name: 'Zara',
          cat_id: 2,
          quantity: 3,
          price: 4500,
          desc: 'Vero Moda Crop Top',
        },
        {
          p_id: 3,
          name: 'Samsung Phone',
          cat_id: 1,
          quantity: 10,
          price: 85000,
          desc: 'Samsung 32GB Phone',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Category', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('Product', null, bulkDeleteOptions);
  },
};
