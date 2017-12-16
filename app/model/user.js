'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const UserSchema = new mongoose.Schema({
    hashedPassword: { type: String, required: true },
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
    isEmailVerified: { type: Boolean, default: false },
    __v: { type: Number, select: false }
  })

  UserSchema.plugin(timestamps)

  return mongoose.model('User', UserSchema)
}
