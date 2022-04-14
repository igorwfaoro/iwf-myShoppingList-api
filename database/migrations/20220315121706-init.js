'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.sequelize.query(/*sql*/`
      create table prospect_customer(
        id bigint primary key not null auto_increment,
        name varchar(120) not null,
        email varchar(120) not null,
        document_number varchar(14) not null,
        created_at datetime not null default current_timestamp,
        updated_at datetime not null default current_timestamp on update current_timestamp,
        constraint UK_user_email_document_number unique (email, document_number)
      );
    `);

    await queryInterface.sequelize.query(/*sql*/`
      create table api_key(
        id bigint primary key not null auto_increment,
        name varchar(120) not null,
        \`key\` varchar(100) not null
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
