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
                if @item = current_user.items.create(item_params)
                    render :item
                else
                    render json: { errors: 'error' }, status: :unprocessable_entity
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
