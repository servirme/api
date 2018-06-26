module.exports.getRuleRequired = (rule, required) => {
  if (required) {
    return rule.required()
  }

  return rule
}
