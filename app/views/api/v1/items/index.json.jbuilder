if @items.exists?
    json.array!(@items) do |item|
        json.(item, :user_id, :id, :title, :year, :year_for_sort, :year_type, :goro_text, :description)
    end
end