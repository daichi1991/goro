json.id(item_mylist.id)
json.memory_level(item_mylist.memory_level)
json.items do
    json.array!(item_mylist.items) do |item|
        json.partial! partial: 'items/item', locals: {item:item}
    end
end