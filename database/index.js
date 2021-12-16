const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('fbc', 'postgres', 'postgres', {
  host: '10.49.144.4', //  35.236.62.7 public IP
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

const Forum = sequelize.define('Forum', {
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

const Workout = sequelize.define('Workout', {
  user_id_created: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  popularity_score: {
    type: DataTypes.INTEGER
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'workouts',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

const User = sequelize.define('users', {
  google_id: {
    type: DataTypes.STRING,
  },
  is_coach: {
    type: DataTypes.BOOLEAN,
  },
  coach_id: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  profile_photo_url: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  age: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})

const Comment = sequelize.define('comments', {
  user_id: {
    type: DataTypes.INTEGER,
  },
  post_id: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING,
  },
  time_posted: {
    type: DataTypes.DATE,
  },
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})

Forum.belongsTo(Recipe, { foreignKey: 'recipe_id' })
Forum.belongsTo(Workout, { foreignKey: 'workout_id' })
Forum.belongsTo(User, { foreignKey: 'user_id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })
Forum.hasMany(Comment, { foreignKey: 'post_id'} )


module.exports = {
  sequelize,
  Forum,
  Recipe,
  Workout,
  User,
  Comment
};