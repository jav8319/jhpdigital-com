const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contact extends Model {
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    }, 

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },


    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'contacts',
  }
);

module.exports = Contact;


// const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// const sequelize = require('../config/connection');

// class User extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     uuid: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       unique: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     phone_number: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     two_factor_enabled: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     two_factor_secret: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     recovery_codes: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     last_login: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     last_activity: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     last_login_ip: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     failed_login_attempts: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     lockout_until: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     aws_user_id: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     aws_metadata: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//   },
//   {
//     hooks: {
//       async beforeCreate(newUserData) {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'users',
//   }
// );

// module.exports = User;
