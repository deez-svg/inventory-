class Stock < ApplicationRecord
  belongs_to :material

  validates :minimum, :current, :value, comparison: { greater_than_or_equal_to: 0 }

  def status
    if current > minimum
      "Good"
    else
      "Need Refill"
    end
  end
end
