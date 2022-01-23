class Api::V1::Auth::RegistrationsController < Devise::RegistrationsController

    def create
        user = User.new(sign_up_params)
        begin
            if user.save
                render json: {success:'success'}, status: 201
            else
                render json: { errors:'error' }, status: 422
            end
        rescue ActiveRecord::RecordNotUnique
            render json: { errors:'already registerd but not confirmed yet',duplication:true }, status: 422
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

    def resend_confirmation
        user = User.find_by(email: params[:email])
        if user.present?
            if !user.confirmed_at
                user.send_confirmation_instructions
                render json: {success:'success',send:true},status: 200
            else
                render json: { errors:'ng' }, status: :unprocessable_entity
            end
        else
            render json: { errors:'ng' }, status: :unprocessable_entity
        end

    end

    

end
