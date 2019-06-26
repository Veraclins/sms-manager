export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Contact.associate = models => {
    Contact.hasMany(models.Sms, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'sent',
    });
    Contact.hasMany(models.Sms, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'received',
    });
  };
  return Contact;
};
