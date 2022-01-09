require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /api/v1/items.json" do
    it "returns 200" do
      get '/api/v1/items.json'
      expect(response).to have_http_status(200)
    end
  end
end
