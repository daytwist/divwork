require "rails_helper"

RSpec.describe "Api::V1::Tasks", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/tasks/show"
      expect(response).to have_http_status(:success)
    end
  end
end
