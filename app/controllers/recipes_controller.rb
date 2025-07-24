class RecipesController < ApplicationController
  def index
    @recipes = Recipe.includes(ingredients: :material).all
  end

  def show
    @recipe = Recipe.includes(ingredients: :material).find_by(id: params[:id])
  end
end
