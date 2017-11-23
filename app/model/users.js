'use strict'

module.exports = ({ mongoose }) => {
  const UsersSchema = new mongoose.Schema({
    password: { type: String },
    secretSalt: { type: String },
    mobile: { type: String, unique: true, trim: true },
    email: { type: String, unique: true, trim: true },
    nickName: { type: String, unique: true, trim: true },
    reanName: { type: String, trim: true },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    address: { type: String, trim: true },
    wechatOpenId: { type: String },
    wechatUnionId: { type: String },
    isMobileVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false }
  })

  return mongoose.model('Users', UsersSchema)
}
