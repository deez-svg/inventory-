module MaterialsDropDownHelper
  def materials_drop_down
    return @materials_drop_down if @materials_drop_down.present?

    @stocks ||= query_stock_for_drop_down
    @materials_drop_down = @stocks.map { [ drop_down_value(it), it.material_id ] }
  end

  private

  def query_stock_for_drop_down
    Stock.includes(:material)
         .select(:material_id, :current, material: [ :name, :unit ])
  end

  def drop_down_value(stock)
    "#{stock.material.name} (stock: #{stock.current} #{stock.material.unit})"
  end
end
