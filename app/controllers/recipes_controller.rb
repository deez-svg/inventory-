class RecipesController < ApplicationController
  def show
    @recipe = Recipe.includes(ingredients: :material).find_by(id: params[:id])
  end
end
