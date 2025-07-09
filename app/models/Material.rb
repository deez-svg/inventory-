class Material < ApplicationRecord
  has_one :stock
  has_many :ingredients
  has_many :recipes, through: :ingredients
  has_many :transactions

  validates :name, :unit, presence: true
end
