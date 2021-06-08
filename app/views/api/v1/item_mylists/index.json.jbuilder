if @item_mylists.exists?
    json.array!(@item_mylists) do |item_mylist|
        json.(item_mylist, :id, :my_list_id, :item_id)
    end
end