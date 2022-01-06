class CreateItemMylists < ActiveRecord::Migration[6.0]
  def change
    create_table :item_mylists do |t|
      t.references :my_list, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.integer :memory_level, null: false
      t.timestamps
    end
  end
end
