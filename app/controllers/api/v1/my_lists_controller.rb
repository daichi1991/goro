module Api
    module V1
        class MyListsController < ApplicationController
            
            def index
                @my_lists = MyList.where(user_id: current_user.id)
                render :index
            end

            def show
                @my_list = MyList.find(id: params[:id])
                render :show
            end
        
            def create
                @my_list = MyList.new(item_params)
                if @my_list.save
                    render :show
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
            end

            private
            def my_list_params
                params.require(:my_list).permit(:user_id, :item_id, :name)
            end

        end
    end
end
