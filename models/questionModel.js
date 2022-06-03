const sequelize = require("../config/db")
const DataTypes = require('sequelize')
// const questions = require("../data/questions")

const Questions = sequelize.define('Questions', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pattern:{
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('pattern').split(';')
        },
        set(val) {
           this.setDataValue('pattern',val.join(';'));
        },
    },
    difficulty:{
        type: DataTypes.STRING,
        allowNull: false
    },
    premium:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    companies:{
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('companies').split(';')
        },
        set(val) {
           this.setDataValue('companies',val.join(';'));
        },
    },
    done:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }  
  });



const synchronizeTable = async () => {
    await Questions.sync();
    console.log("The table for the Questions model was synchronized!");
}

synchronizeTable();

// questions.forEach(async (question) => {
//     try{
//         let newques = {...question, userId: 2, done: false}
//         await Questions.create(newques);
//     } catch(err) {
//         console.log(err);
//     }
// })


module.exports = Questions;
