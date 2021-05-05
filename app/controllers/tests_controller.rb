class TestsController < ApplicationController
    def create
        @test = Test.new(user_id:current_user.id, name:params[:name])
        if @test.save
            render json:@test
        else
            render json: { errors: { 'errordesuyo' => ['is invalid'] } }, status: :unprocessable_entity
        end
    end

    def test_params
        params.require(:test).permit(:name)
    end
end
