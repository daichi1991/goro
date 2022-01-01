class Api::V1::Auth::SessionsController < Devise::SessionsController

    def create
        user = User.find_by_email(sign_in_params[:email])
        
        if user && user.valid_password?(sign_in_params[:password])
            token = current_user.generate_jwt
            cookies[:token]= {value:token, httponly: true}
            render json: token.to_json
        else
            render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
        end
    end

    def destroy
        # super
        devise_destroy
    end

    def devise_destroy
        signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        cookies.delete(:token)
        render json: { status: 'SUCCESS', message: 'Singed Out'}
    end



end