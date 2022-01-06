class AddYearForSortToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :year_for_sort, :bigint
  end
end
