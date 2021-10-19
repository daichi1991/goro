json.id(@my_list.id)
json.name(@my_list.name)
json.items do
    json.array!(@my_list.item_mylists) do |item_mylist|
        json.item_mylist_id(item_mylist.id)
        json.memory_level(item_mylist.memory_level)
        json.id(item_mylist.item.id)
        json.item_user_id(item_mylist.item.user_id)
        json.title(item_mylist.item.title)
        json.year(item_mylist.item.year)
        json.year_type(item_mylist.item.year_type)
        json.goro_text(item_mylist.item.goro_text)
        json.description(item_mylist.item.description)
    end
end
