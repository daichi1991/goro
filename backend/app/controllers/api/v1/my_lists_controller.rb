module Api
    module V1
        class MyListsController < ApplicationController
            
            def index
                if signed_in?
                    @my_lists = MyList.where(user_id: current_user.id)
                    render :index
                else
                    render json:{data:nil}
                end
            end

            def show
                @my_list = MyList.find(params[:id])
                render :show
            end
        
            def create
                @my_list = MyList.new(my_list_params)
                @my_list.user_id = current_user.id
                if @my_list.save
                    render :show
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
            end

            def update
                @my_list = MyList.find(params[:id])
                if @my_list.update(name: params[:name])
                    render :show
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
            end

            def destroy
                @my_list = MyList.find(params[:id])
                if @my_list.delete
                    render json: {success:'success'}, status: 200
                else
                    render json: {error:'error'}, status: unprocessable_entity
                end
            end

            private
            def my_list_params
                params.require(:my_list).permit(:user_id,:name)
            end

        end
    end
end
