class RecipesController < ApplicationController
  before_action :set_recipe, only: [ :update, :destroy ]
  before_action :set_recipe_with_ingredients, only: [ :show, :edit ]
  before_action :set_materials, only: [ :new, :edit ]

  def index
    @recipes = Recipe.includes(:ingredients).all
  end

  def show; end

  def new
    @recipe = Recipe.new(kind: Recipe.kinds[kind_param] || "sweet")
    @recipe.ingredients.build
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to @recipe, notice: "Recipe was successfully created."
    else
      render :new
    end
  end

  def edit; end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: "Recipe was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_path, notice: "Recipe was successfully deleted."
  end

  private

  def set_recipe
    @recipe = Recipe.find_by(id: params[:id])
  end

  def set_recipe_with_ingredients
    @recipe = Recipe.includes(ingredients: :material).find_by(id: params[:id])
  end

  def set_materials
    @materials = Material.all
  end

  def recipe_params
    params.require(:recipe).permit(:name, :unit, :quantity, :kind,
                                   ingredients_attributes: [ [ :id, :material_id, :quantity, :_destroy ] ])
  end

  def kind_param
    params[:kind]
  end
end
