module Api
    module V1
        class ItemMyListsController < ApplicationController

            def index
                @item_mylists = ItemMylist.where(mylist_id: params[:mylist_id])
                render :index
            end

            def show
                @item_mylist = ItemMylist.find(id: params[:id])
                render :show
            end

            def create
                @item_mylist = ItemMylist.new(item_mylist_params)
                if @item_mylist.save
                    render :show
                else
                    render json: {error:'error'}, status: unprocessable_entity
                end
            end

            private
            def item_mylist_params
                params.require(:item_mylist).permit(:user_id, :my_list_id)
            end
            
            
            

        end
    end
end
