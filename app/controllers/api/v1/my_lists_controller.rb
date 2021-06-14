module Api
    module V1
        class MyListsController < ApplicationController
            
            def index
                logger.debug("aaaaaa")
                @my_lists = MyList.where(user_id: current_user.id)
                logger.debug("bbbbbb")
                render :index
            end

            def show
                @my_list = MyList.find(params[:id])
                logger.debug(@my_list)
                render :show
            end
        
            def create
                @my_list = MyList.new(my_list_params)
                @my_list.user_id = current_user.id
                if @my_list.save
                    logger.debug(@my_list)
                    render :show
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
            end

            private
            def my_list_params
                params.require(:my_list).permit(:user_id,:name)
            end

        end
    end
end