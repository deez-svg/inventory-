class StocksController < ApplicationController
  include MaterialsDropDownHelper

  def index
    @stocks = Stock.includes(:material).order("materials.name").strict_loading.all
  end
end
