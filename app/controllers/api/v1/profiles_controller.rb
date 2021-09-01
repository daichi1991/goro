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

            def upload_image
                if Profile.exists?(user_id: current_user.id)
                    logger.debug('aaaaa')
                    profile = Profile.find_by(user_id: current_user.id)
                    if profile.update(profile_params)
                        render json: {success:'success'}, status: 200
                    else
                        render json: {error:'error'}, status: :unprocessable_entity
                    end
                else
                    profile = Profile.new(profile_params)
                    
                    profile.user_id = current_user.id
                    if profile.save
                        render json: {success:'success'}, status: 200
                    else
                        render json: {error:'error'}, status: :unprocessable_entity
                    end
                end
            end

            private

            def profile_params
                params.permit(:user_id, :image)
            end
        end
    end
end