class MyList < ApplicationRecord
    belongs_to :user
    has_many :items, through: :item_mylists
    has_many :item_mylists
end
