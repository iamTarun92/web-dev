const mongoose = require('mongoose')

const UserPermissionSchema = new mongoose.Schema({
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
})

const UserPermission = mongoose.model('UserPermission', UserPermissionSchema)

module.exports = UserPermission
