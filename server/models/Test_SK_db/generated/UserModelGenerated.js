/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5e718bb34ec9eb0ea62228de
*
* You will get 10% discount for each one of your friends
* 
*/
/**
 * 
 * 
  _____                      _              _ _ _     _   _     _        __ _ _      
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |     
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___ 
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|
 
 * DO NOT EDIT THIS FILE!! 
 * 
 *  TO CUSTOMIZE UserModelGenerated.js PLEASE EDIT ../UserModel.js
 * 
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 * 
 */
// Database
import Database from "../../../classes/Database_Test_SK_db";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../../../classes/Logger";

const generatedModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
      * User
      */
    const userSchema = new mongoose.Schema({
      mail: {
        type: "String"
      },
      name: {
        type: "String"
      },
      password: {
        type: "String", 
        required: true
      },
      roles: [{
        type: "String"
      }],
      surname: {
        type: "String"
      },
      username: {
        type: "String", 
        required: true
      },
      // RELATIONS
      
      
      // EXTERNAL RELATIONS
      /*
      userId: {
        type: Schema.ObjectId,
        ref: "Article"
      },
      */
    });

    generatedModel.setModel(db.connection.model("User", userSchema));
    generatedModel.createAdminUser();

    return userSchema;
  },

  /**
   * Set Model
   */
  setModel: model => {
    generatedModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return generatedModel.model;
  },

  // Start queries
    

  // CRUD METHODS

  
  /**
  * UserModel.create
  *   @description CRUD ACTION create
  *
  */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },
  
  /**
  * UserModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * UserModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  async get(id) {
    return await generatedModel.model.findOne({ _id : id }).select("-password");
  },
  
  /**
  * UserModel.list
  *   @description CRUD ACTION list
  *
  */
  async list() {
    return await generatedModel.model.find().select("-password");
  },
  
  /**
  * UserModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  async update(item) { 
    delete item.password;

    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  



  // Start custom queries User

  /**
   * Get User by username e password
   */
  getByUsernameAndPassword: async (username, password) => {
    // CUSTOMIZE THIS FUNCTION
    // if you want to change login method

    let user = await generatedModel.model
      .findOne({
        username: username,
        password: password
      })
      .lean();
    if (user) user.password = undefined;
    return user;
  },

  /**
   * Update password
   */
  updatePassword: async (idUser, password) => {
    let user = await generatedModel.model.findOneAndUpdate({ _id: idUser }, {
      password: password
    });
    return user;
  },

  /**
   * Create ADMIN user if it not exists
   */
  createAdminUser: async () => {
    const count = await generatedModel.model.collection.countDocuments();
    if (count == 0) {
      Logger.info("Create admin user");
      var admin = new generatedModel.model({
        username: "admin",
        password:
          "62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5",
        roles: ["ADMIN"]
      });
      return await admin.save();
    }
  }
};

export default generatedModel;
