class Api::V1::Auth::ConfirmationsController < Devise::ConfirmationsController
    def show
        self.resource = resource_class.confirm_by_token(params[:confirmation_token])
        yield resource if block_given?
    
        if resource.errors.empty?
            render json: {result:"ok"}
        else
            render json: { result:'ng' }, status: :unprocessable_entity
        end
    end
end