const sequelize = require("./db");
const Sequelize = require("sequelize")
const User = require("./user.model")
const Role = require("./role.model")
const Store = require("./store.model")

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;
db.Store = Store;

//Association
// Many-to-Many: User - Role
db.User.belongsToMany(db.Role, { through: "user_roles" });
db.Role.belongsToMany(db.User, { through: "user_roles" });

// One-to-Many: User - Store
db.User.hasMany(db.Store, { foreignKey: "userId" });
db.Store.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;