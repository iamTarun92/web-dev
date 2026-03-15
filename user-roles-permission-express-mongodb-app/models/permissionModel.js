const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    permissions: [
      {
        permission_name: {
          type: String,
          required: true,
        },

        permission_value: [
          {
            type: String,
            enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Permission', permissionSchema)
