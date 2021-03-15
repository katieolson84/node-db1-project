const Account = require('../accounts/accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

// exports.checkAccountNameUnique = async (req, res, next) => {
//   if(!req.body)
  
// }

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getAll(req.params.id)
    if(!account) {
      res.status(404).json({
        message: "account not found"
      })
    }else{
      req.account = account
      next()
    }
  }catch(err) {
    next(err)
  }
};
