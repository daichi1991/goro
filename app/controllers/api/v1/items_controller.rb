module Api
    module V1
        class ItemsController < ApplicationController

            def index
                @items = Item.all
                render :index
            end

            def create
                @item = Item.new(item_params)
                @item.user_id = current_user.id
                if @item.save
                    render json:@item
                else
                    render json: { errors:'error'  }, status: :unprocessable_entity
                end
            end
            
        
            private
            def item_params
                params.require(:item).permit(:title, :year, :year_type, :goro_text,:description)
            end
            
        end
        
    end
end
