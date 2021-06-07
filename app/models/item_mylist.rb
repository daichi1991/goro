class ItemMylist < ApplicationRecord
    belongs_to :my_list
    has_many :items
end
