class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title , null:false
      t.integer :year, null:false
      t.string :year_type, null:false 
      t.string :description, null:false
      t.timestamps
    end
  end
end
