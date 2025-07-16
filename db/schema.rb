# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_08_142614) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "ingredients", force: :cascade do |t|
    t.bigint "recipe_id"
    t.bigint "material_id"
    t.decimal "quantity", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_ingredients_on_material_id"
    t.index ["recipe_id"], name: "index_ingredients_on_recipe_id"
  end

  create_table "materials", force: :cascade do |t|
    t.string "name", null: false
    t.string "unit", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_materials_on_name", unique: true
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "quantity", precision: 10, scale: 2, null: false
    t.string "unit", null: false
    t.integer "kind", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_recipes_on_name", unique: true
  end

  create_table "stocks", force: :cascade do |t|
    t.bigint "material_id"
    t.decimal "minimum", precision: 10, scale: 2, default: "0.0", null: false
    t.decimal "current", precision: 10, scale: 2, default: "0.0", null: false
    t.decimal "value", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_stocks_on_material_id", unique: true
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "material_id"
    t.decimal "quantity", precision: 10, scale: 2, null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_transactions_on_material_id"
  end
end
