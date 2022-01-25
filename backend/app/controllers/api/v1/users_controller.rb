module Api
    module V1
        class UsersController < ApplicationController
            before_action :signed_in?

            def update
                @user = User.find(current_user.id)
                @user.update(user_params)
            end

            def current_user_show
                if signed_in?
                    @user = User.find(current_user.id)
                    render :show
                else
                    render json: {id:nil, username:nil}
                end
            end

            def show
                @user = User.find(id: params[:user_id])
                render :show
            end

            def sign_in_check
                token = cookies[:token]
                if signed_in?
                    render json: {status: 'SUCCESS', data: token}
                else
                    render json: {status: 'SUCCESS', data: nil}
                end
            end

            private

                def user_params
                    params.require(:user).permit(:id,:username)
                end

        end
    end
end