const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('fbc', 'postgres', 'postgres', {
  host: '35.236.62.7',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(
    console.log('Success!')
  )
  .catch(err => {
    console.log(err)
  });

sequelize.sync({
  force: false
})

const Forum = sequelize.define('forums', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.INTEGER
  },
  recipe_id: {
    type: DataTypes.INTEGER
  },
  workout_id: {
    type: DataTypes.INTEGER
  },
  time_posted: {
    type: DataTypes.DATE
  },
}, {
  tableName: 'forum_posts',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

const Recipe = sequelize.define('recipes', {
  name: {
    type: DataTypes.STRING,
  },
  vegan: {
    type: DataTypes.BOOLEAN,
  },
  vegetarian: {
    type: DataTypes.BOOLEAN,
  },
  dairy_free: {
    type: DataTypes.BOOLEAN,
  },
  gluten_free: {
    type: DataTypes.BOOLEAN,
  },
  keto: {
    type: DataTypes.BOOLEAN,
  },
  low_fodmap: {
    type: DataTypes.BOOLEAN,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  instructions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  summary: {
    type: DataTypes.STRING,
  },
  calories: {
    type: DataTypes.INTEGER,
  },
  protien: {
    type: DataTypes.INTEGER,
  },
  fat: {
    type: DataTypes.INTEGER,
  },
  carbs: {
    type: DataTypes.INTEGER,
  },
  popularity_score: {
    type: DataTypes.INTEGER,
  },
  likes: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

Forum.belongsTo(Recipe, { foreignKey: 'recipe_id' })


module.exports = {
  sequelize,
  Forum,
  Recipe
};