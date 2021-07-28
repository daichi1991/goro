class ApplicationController < ActionController::API

    include ActionController::Cookies
    respond_to :json
    before_action :process_token

    private

    # Check for auth headers - if present, decode or send unauthorized response (called always to allow current_user)
    # def process_token
    #     if request.headers['Authorization'].present?
    #         begin
    #             jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.secrets.secret_key_base).first
    #             @current_user_id = jwt_payload['id']
    #         rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    #             head :unauthorized
    #         end
    #     end
    # end

    def process_token
        if !cookies["token"].blank?
            begin
                # token_user = cookies["token"].split(".")[1]
                token_user = cookies["token"]
                jwt_payload = JWT.decode(token_user, Rails.application.secrets.secret_key_base)[0]
                @current_user_id = jwt_payload['id'].to_i
            rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
                head :unauthorized
            end
        end
    end

    # If user has not signed in, return unauthorized response (called only when auth is needed)
    def authenticate_user!(options = {exept: [:index, :update]})
        head :unauthorized unless signed_in?
    end

    # set Devise's current_user using decoded JWT instead of session
    def current_user
        @current_user ||= super || User.find(@current_user_id)
    end

    # check that authenticate_user has successfully returned @current_user_id (user is authenticated)
    def signed_in?
        @current_user_id.present?
    end



end
