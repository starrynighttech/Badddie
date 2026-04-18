const Wallet = require("../models/Wallet")

exports.addMoney = async (userId, amount) => {
  let wallet = await Wallet.findOne({ userId })

  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0 })
  }

  wallet.balance += amount
  await wallet.save()

  return wallet.balance
}
