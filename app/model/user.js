'use strict'

module.exports = ({ mongoose }) => {
  const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    secretSalt: { type: String, required: true },
    mobile: { type: String, unique: true, trim: true, index: true },
    email: { type: String, unique: true, trim: true, index: true },
    username: { type: String, unique: true, trim: true },
    realName: { type: String, trim: true },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    address: { type: String, trim: true },
    wechatOpenId: { type: String, index: true },
    wechatUnionId: { type: String, index: true },
    isMobileVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false }
  })

  return mongoose.model('User', UserSchema)
}
