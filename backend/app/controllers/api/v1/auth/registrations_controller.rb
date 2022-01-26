class Api::V1::Auth::RegistrationsController < Devise::RegistrationsController

    def create
        user = User.new(sign_up_params)
        exist_user = User.find_by(email: user.email)
        if exist_user.present?
            if exist_user.confirmed_at != nil
                render json: {status:'error',message:'already registerd and confirmed', already:true, confirmed:true}, status: 422
            else
                render json: {status:'error',message:'already registerd but not confirmed yet',already:true, confirmed:false }, status: 422
            end
        else
            if user.save
                render json: {status:'success',message:'success', already:false, confirmed:false}, status: 201
            else
                render json: {status:'error',message:'unknown error', already:false, confirmed:false}, status: 422
            end
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
