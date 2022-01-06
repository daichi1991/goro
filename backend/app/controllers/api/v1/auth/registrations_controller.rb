class Api::V1::Auth::RegistrationsController < Devise::RegistrationsController

    def create
        user = User.new(sign_up_params)

        if user.save
            render json: {ok:"ok"}
        else
            render json: { errors:'ng' }, status: :unprocessable_entity
        end

    end

    def after_sign_up_path_for(resource)
        admin_user_mail_sent_message_path
    end

    def after_inactive_sign_up_path_for(resource)
        admin_user_mail_sent_message_path
    end

    def after_update_path_for(resource)
        account_page_path
    end

    

end
