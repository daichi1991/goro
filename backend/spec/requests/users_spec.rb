require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /api/v1/auth" do
    before do
      ActionMailer::Base.deliveries.clear
    end
    it "creates user collectly" do
      expect{
        post '/api/v1/auth', params: {
          user:{
            email:'a@gmail.com',
            password: '123456',
            password_confirmation: '123456',
          }
        }
      }.to change(User, :count).by(1)
      expect(response).to have_http_status(201)
    end

    it "send confirmation mail" do
      post '/api/v1/auth', params: {
        user:{
          email:'a@gmail.com',
          password: '123456',
          password_confirmation: '123456',
        }
      }
      expect(ActionMailer::Base.deliveries.size).to eq 1
    end

    it "creates user fail" do
      post '/api/v1/auth', params: {
        user:{
          email:'a@gmail.com',
          password: '123456',
          password_confirmation: '123456',
        }
      }      
      expect{
        post '/api/v1/auth', params: {
          user:{
            email:'a@gmail.com',
            password: '123456',
            password_confirmation: '123456',
          }
        }
      }.to_not change(User, :count)
      expect(response).to have_http_status(422)
    end    
  end

  describe "GET /api/v1/users/resend_confirmation" do
    before do
      post '/api/v1/auth', params: {
        user:{
          email:'a@gmail.com',
          password: '123456',
          password_confirmation: '123456',
        }
      }
      ActionMailer::Base.deliveries.clear
    end
    it "send confirm mail collectly" do
      post '/api/v1/auth/resend_confirmation', params:{
        email:'a@gmail.com'
      }
      expect(ActionMailer::Base.deliveries.size).to eq 1
    end
  end
end
