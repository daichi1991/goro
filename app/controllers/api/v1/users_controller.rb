module Api
    module V1
        class UsersController < ApplicationController

            def image_upload
                user = User.find(current_user.id)
                user.update(user_params)
            end

            private

                def user_params
                    params.require(:user).permit(:image)
                end

        end
    end
end