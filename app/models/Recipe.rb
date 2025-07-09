class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :materials, through: :ingredients

  enum :kind, %i[ sweet savoury bake ]
  validates :name, :unit, :kind, presence: true
  validates :quantity, comparison: { greater_than: 0 }
end
