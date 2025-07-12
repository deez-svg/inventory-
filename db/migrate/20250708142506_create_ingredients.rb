class CreateIngredients < ActiveRecord::Migration[8.0]
  def change
    create_table :ingredients do |t|
      t.belongs_to :recipe
      t.references :material
      t.decimal :quantity, precision: 10, scale: 2, null: false

      t.timestamps
    end
  end
end
