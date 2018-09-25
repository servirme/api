const config = {
  tableName: 'establishments_users',
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
    establishment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }

  return sequelize.define(
    'EstablishmentUser',
    fields,
    config
  )
}
