module Api
    module V1
        class ItemsController < ApplicationController

            def index
                @items = Item.all
                render :index
            end

            def user_index
                @items = Item.where(user_id: current_user.id)
                render :user_index
            end

            def other_user_index
                @items = Item.where(user_id: params[:user_id])
                render :user_index
            end

            def create
                @item = Item.new(item_params)
                
                @item.user_id = current_user.id
                yearType = @item.year_type
                year = @item.year
                yearForSort = 0
                nowYear = Date.today.year

                case yearType
                when "紀元後"
                    yearForSort = year
                when "紀元前"
                    yearForSort = 0 - year
                when "年前"
                    yearForSort = nowYear - year
                when "万年前"
                    yearForSort = nowYear - year * 10000
                when "億年前"
                    yearForSort = nowYear - year * 100000000
                end

                @item.year_for_sort = yearForSort

                @items = Item.where(user_id: current_user.id)

                if @item.save
                    render :user_index
                else
                    render json: { errors:'error'  }, status: :unprocessable_entity
                end
            end

            def search
                if params[:keyword]
                    keywords = params[:keyword].split(/[[:blank:]]+/).select(&:present?)
                    items = []
                    keywords.each do |keyword|
                        items += Item.where('title LIKE (?) OR year LIKE(?) OR goro_text LIKE(?) OR description LIKE(?)', "%#{keyword}%", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
                    end
                else
                    items = Items.all
                end
                render json: items
            end
            
        
            private
            def item_params
                params.require(:item).permit(:title, :year, :year_type, :goro_text,:description)
            end
            
        end
        
    end
end
