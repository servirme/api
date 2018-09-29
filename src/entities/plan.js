const config = {
  tableName: 'plans',
  timestamps: true,
  underscored: true,
  deletedAt: 'deleted_at',
  paranoid: true,
}

module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    active: {
      defaultValue: true,
      type: DataTypes.TINYINT,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }

  return sequelize.define(
    'Plan',
    fields,
    config
  )
}
