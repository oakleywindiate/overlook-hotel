import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import {customers, rooms, bookings} from './mock-data'

describe('User', () => {
  let user1, recipeRepository, ingredientData;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
    user1 = new User(user);
    ingredientData = new Ingredient(ingredientsData)
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should be able to take in a user data set', () => {
    expect(user1.userData).to.equal(user);
  });
