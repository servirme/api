module.exports = {
  internalError: 1,
  validationError: 1000,
  notFound: {
    generic: 1100,
    user: 1101,
    establishment: 1102,
  },
  conflict: {
    generic: 1200,
    user: 1201,
  },
  invalid: {
    generic: 1300,
    body: 1301,
    jwt: 1302,
    password: 1303,
  },
  mismatch: {
    generic: 1400,
  },
  expired: {
    generic: 1500,
    jwt: 1501,
  },
  unauthorized: {
    generic: 1600,
    'empty-token': 1601,
  },
  limitExceeded: {
    generic: 1700,
  },
  forbidden: {
    generic: 1800,
    jwt: 1801,
  },
}
