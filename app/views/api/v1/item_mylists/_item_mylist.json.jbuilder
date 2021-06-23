json.id(item_mylist.id)
json.items do
    json.array!(item_mylist.items) do |item|
        json.partial! partial: 'items/item', locals: {item:item}
    end
end