if @items.exists?
    json.array!(@items) do |item|
        json.(item, :id, :title, :year, :year_type, :goro_text, :description)
    end
end