class CreateMaterials < ActiveRecord::Migration[8.0]
  def change
    create_table :materials do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :unit, null: false

      t.timestamps
    end
  end
end
