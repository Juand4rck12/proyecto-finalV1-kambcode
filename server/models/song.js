import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Artist } from './artist.js';

export const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Set up the relationship
Song.belongsTo(Artist);
Artist.hasMany(Song);