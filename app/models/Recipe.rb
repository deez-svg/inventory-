class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :materials, through: :ingredients

  accepts_nested_attributes_for :ingredients, allow_destroy: true

  enum :kind, %i[ sweet savoury bake ]
  validates :name, :unit, :kind, presence: true
  validates :quantity, comparison: { greater_than: 0 }
end
