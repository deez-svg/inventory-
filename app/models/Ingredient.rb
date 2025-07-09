class Ingredient < ApplicationRecord
  belongs_to :material
  belongs_to :recipe

  validates :quantity, comparison: { greater_than: 0 }
end
