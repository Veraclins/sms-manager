export default (sequelize, DataTypes) => {
  const Sms = sequelize.define(
    'Sms',
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('unread', 'read'),
      },
    },
    {}
  );
  Sms.associate = models => {
    Sms.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'sender',
    });
    Sms.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      as: 'receiver',
    });
  };
  return Sms;
};
