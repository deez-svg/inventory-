class Stock < ApplicationRecord
  belongs_to :material

  validates :minimum, :current, comparison: { greater_than_or_equal_to: 0 }

  def status
    if current > minimum
      "good"
    else
      "bad"
    end
  end
end
