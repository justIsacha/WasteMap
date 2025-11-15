import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User reference required'],
      ref: 'User',
    },
    wasteType: {
      type: String,
      required: [true, 'Waste type required'],
      enum: ['Household', 'Recyclable', 'Bulky', 'Hazardous', 'Garden', 'Electronic', 'Other'],
      default: 'Household',
    },
    description: {
      type: String,
      maxlength: [500, 'Description max 500 chars'],
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        required: [true, 'Latitude required'],
        min: [-90, 'Latitude -90 to 90'],
        max: [90, 'Latitude -90 to 90'],
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude required'],
        min: [-180, 'Longitude -180 to 180'],
        max: [180, 'Longitude -180 to 180'],
      },
      address: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

requestSchema.index({ user: 1, status: 1 });
requestSchema.index({ createdAt: -1 });

const Request = mongoose.model('Request', requestSchema);
export default Request;