module Api
    module V1
        class ItemsController < ApplicationController

            def index
                @items = Item.all
                logger.debug(@items)
                render :index
            end

            def user_index
                @items = Item.where(user_id: current_user.id)
                logger.debug(@items)
                render :user_index
            end

            def create
                @item = Item.new(item_params)
                
                @item.user_id = current_user.id

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
