module.exports = {
  internalError: 1,
  validationError: 1000,
  notFound: {
    generic: 1100,
  },
  conflict: {
    generic: 1200,
  },
  invalid: {
    generic: 1300,
    body: 1301,
    jwt: 1302,
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
  },
  limitExceeded: {
    generic: 1700,
  },
}
