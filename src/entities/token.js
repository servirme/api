const config = {
  tableName: 'tokens',
  timestamps: true,
  underscored: true,
  updatedAt: false,
  paranoid: false,
}

module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    created_at: DataTypes.DATE,
  }

  return sequelize.define(
    'Token',
    fields,
    config
  )
}
