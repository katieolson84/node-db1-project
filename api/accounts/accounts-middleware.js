const Account = require('../accounts/accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  try{
    const name = req.body.name;
    const budget = req.body.budget;

    if(!name || !budget) {
      res.status(400).json({message: "name and budget are required"})
    }else if (typeof name !== 'string') {
      res.status(400).json({message: "name of account must be a string"})
    }else if (typeof budget !== 'number'){
      res.status(400).json({message: "budget of account must be a number"})
    }else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({message: "name of account must be between 3 and 100"})
    }else if (budget < 0 || budget > 1000000) {
      res.status(400).json({message: "budget of account is too large or too small"})
    }else {
      req.body.name = name.trim()
      next()
    }
  }catch {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const existingAccounts = await Account.getAll()
    const name = req.body.name.trim()
    const checkName = existingAccounts.filter((item) => {
      if(item.name === name) {
        res.json(name)
      }
    })
    if( checkName.length > 0) {
      res.status(400).json({message: "that name is taken"})
    }else {
      next()
    }
  }catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    if(account) {
     req.account = account
     next()
    }else{
      res.status(404).json({message: "account not found"})
    }
  }catch(err) {
    next(err)
  }
};


