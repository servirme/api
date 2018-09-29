const config = {
  tableName: 'establishments',
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
    active: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    logo: DataTypes.STRING(150),
    street: DataTypes.STRING(50),
    number: DataTypes.STRING(10),
    district: DataTypes.STRING(50),
    city: DataTypes.STRING(50),
    state: DataTypes.STRING(50),
    slug: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    site: DataTypes.STRING(50),
    landline_phone: DataTypes.STRING(30),
    email: {
      type: DataTypes.STRING(60),
      validate: {
        isEmail: true,
      },
    },
    category_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }

  return sequelize.define(
    'Establishment',
    fields,
    config
  )
}
