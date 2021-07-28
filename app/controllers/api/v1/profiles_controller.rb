module Api
    module V1
        class ProfilesController < ApplicationController

            def create
                profile = Profile.new(profile_params)
                profile.user_id = current_user.id
                if profile.save
                    render json: {success:'success'}, status: 200
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
            end
            

            def update
                profile = Profile.find(params[:id])
                if profile.save
                    render json: {success:'success'}, status: 200
                else
                    render json: {error:'error'}, status: :unprocessable_entity
                end
                
            end

            private

            def profile_params
                params.permit(:user_id, :image)
            end
        end
    end
end