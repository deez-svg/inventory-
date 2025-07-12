class CreateStocks < ActiveRecord::Migration[8.0]
  def change
    create_table :stocks do |t|
      t.belongs_to :material, index: { unique: true }
      t.decimal :minimum, precision: 10, scale: 2, null: false, default: 0
      t.decimal :current, precision: 10, scale: 2, null: false, default: 0
      t.decimal :value, precision: 10, scale: 2, null: false, default: 0

      t.timestamps
    end
  end
end
