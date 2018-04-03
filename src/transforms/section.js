const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  name: prop('name'),
  active: prop('active'),
  menu_id: prop('menuId'),
  icon: prop('icon'),
})

module.exports.output = applySpec({
  id: prop('id'),
  name: prop('name'),
  active: prop('active'),
  menuId: prop('menu_id'),
  icon: prop('icon'),
  createdAt: prop('created_at'),
  updatedAt: prop('updated_at'),
})
