class Transaction < ApplicationRecord
  belongs_to :material

  validates :quantity, :amount, comparison: { greater_than: 0 }
end
