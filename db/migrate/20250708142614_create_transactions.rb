class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :material
      t.decimal :quantity, precision: 10, scale: 2, null: false
      t.integer :amount, null: false

      t.timestamps
    end
  end
end
