class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false, index: { unique: true }
      t.float :quantity, null: false
      t.string :unit, null: false
      t.integer :kind, null: false

      t.timestamps
    end
  end
end
