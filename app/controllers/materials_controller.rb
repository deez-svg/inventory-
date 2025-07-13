class MaterialsController < ApplicationController
  before_action :find_material!, only: [:edit, :update, :destroy]

  def index
    @materials = Material.includes(:stock)
                         .order(:name)
                         .strict_loading.all
  end

  def new
    @material = Material.new
    @material.build_stock
  end

  def create
    @material = Material.new(material_params)
    if @material.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to materials_path, notice: 'Material was successfully created.' }
      end
    else
      render :new
    end
  end

  def edit; end

  def update
    if @material.update(material_params)
      redirect_to materials_path, notice: 'Material was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @material.destroy
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.remove(@material) }
        format.html { redirect_to materials_path, notice: 'Material was successfully destroyed.' }
      end
    else
      redirect_to materials_path, alert: 'Material could not be destroyed.'
    end
  end

  private

  def find_material!
    @material = Material.find_by(id: params[:id])
    head :not_found unless @material
  end

  def material_params
    params.require(:material).permit(:name, :unit, stock_attributes: [:current, :minimum, :value])
  end
end
