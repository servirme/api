const config = {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  deletedAt: 'deleted_at',
  paranoid: true,
}

module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: DataTypes.STRING(60),
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }

  return sequelize.define(
    'User',
    fields,
    config
  )
}
