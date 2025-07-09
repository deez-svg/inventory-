class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :material
      t.float :quantity, null: false
      t.integer :amount, null: false

      t.timestamps
    end
  end
end
