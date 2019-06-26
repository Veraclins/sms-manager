module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'sender',
        },
      },
      receiverId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'receiver',
        },
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('unread', 'read'),
        defaultValue: 'unread',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sms');
  },
};
