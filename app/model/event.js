'use strict'

module.exports = ({ mongoose }) => {
  const OrganizerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    contact: { type: String },
    email: { type: String },
    address: { type: String },
    site: { type: String }
  })

  const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    postImage: { type: String },
    eventStartAt: { type: Date, required: true },
    eventEndAt: { type: Date, required: true },
    checkInStartAt: { type: Date },
    checkInEndAt: { type: Date },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    address: { type: String, trim: true },
    organizers: [OrganizerSchema],
    limitCheckInAmount: { type: Number },
    isRegisteredOnly: { type: Boolean, default: false },
    checkInType: { type: String, required: true },
    redirect: { type: String },
    subEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    isAutoCheckIn: { type: Boolean, default: false }
  })

  return mongoose.model('Event', EventSchema)
}
