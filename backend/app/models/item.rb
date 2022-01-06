class Item < ApplicationRecord
    belongs_to :user
    has_many :my_lists, through: :item_mylists
    has_many :item_mylists
end
