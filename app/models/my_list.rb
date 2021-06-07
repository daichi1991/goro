class MyList < ApplicationRecord
    belongs_to :user
    has_many :item_mylists
end
