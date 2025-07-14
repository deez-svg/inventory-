class Transaction < ApplicationRecord
  belongs_to :material
  validates :quantity, :price, comparison: { greater_than: 0 }
  after_create :update_stock_level

  private

  def update_stock_level
    stock = Stock.find_by(material_id: material.id)
    stock.update(current: stock.current + quantity, value: stock.value + price)
  end
end
