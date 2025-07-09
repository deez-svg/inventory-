class CreateStocks < ActiveRecord::Migration[8.0]
  def change
    create_table :stocks do |t|
      t.belongs_to :material, index: { unique: true }
      t.float :minimum, null: false
      t.float :current, null: false, default: 0

      t.timestamps
    end
  end
end
