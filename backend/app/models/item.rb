class Item < ApplicationRecord
    belongs_to :user
    has_many :my_lists, through: :item_mylists
    has_many :item_mylists

    before_save :calculate_year_for_sort

    def calculate_year_for_sort
        current_year = Date.today.year

        self.year_for_sort = case year_type
            when "紀元後" then year
            when "紀元前" then 0 - year
            when "年前" then current_year - year
            when "万年前" then current_year - year * 10_000
            when "億年前" then current_year - year * 100_000_000
            else 0
        end
    end
end
