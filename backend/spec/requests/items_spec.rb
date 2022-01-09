require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /api/v1/items.json" do
    it "returns 200" do
      get '/api/v1/items.json'
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /api/v1/items.json" do
    let(:user) { User.create }
    let(:token) { user.generate_jwt }

    it "creates item collectly" do
      expect {
        post '/api/v1/items.json', params: {
          item: {
            title: "江戸幕府が開かれる",
            year: "3",
            year_type: "紀元前",
            goro_text: "ヒーローのおっさん徳川家康登場",
            description: "aaa",
          }
        }, headers: { cookie: "token=#{token}" }  
      }.to change(Item, :count).by(1)
      expect(Item.last.year_for_sort).to eq -3
      expect(response).to have_http_status(200)
    end
  end
end
