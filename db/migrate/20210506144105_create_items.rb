class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.integer :year
      t.string :year_type
      t.string :goro_text
      t.text :description
      t.timestamps
    end
  end
end
