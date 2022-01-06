if @my_lists.exists?
    json.array!(@my_lists) do |my_list|
        json.(my_list, :id, :user_id, :name)
    end
end