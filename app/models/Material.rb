class Material < ApplicationRecord
  has_one :stock, dependent: :destroy
  has_many :ingredients
  has_many :recipes, through: :ingredients
  has_many :transactions

  accepts_nested_attributes_for :stock, allow_destroy: true

  UNITS = [ "kg", "g", "l", "ml" ]

  validates :name, :unit, presence: true
  validates :name, uniqueness: { case_sensitive: false }
end
