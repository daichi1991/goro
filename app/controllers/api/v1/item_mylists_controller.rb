module Api
    module V1
        class ItemMylistsController < ApplicationController

            def index
                @item_mylists = ItemMylist.all
                logger.debug(@item_mylists)
                render :index
            end

            def mylist_index
                @item_mylists = ItemMylist.where(my_list_id: params[:my_list_id])
                logger.debug(@item_mylists)
                render :index
            end

            def show
                @item_mylist = ItemMylist.find(params[:id])
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
                params.require(:item_mylist).permit(:my_list_id, :item_id)
            end
            
            
            

        end
    end
end
