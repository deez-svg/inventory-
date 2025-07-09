class MaterialsController < ApplicationController
  def index
    @materials = Material.includes(:stock).strict_loading.all
  end
end
