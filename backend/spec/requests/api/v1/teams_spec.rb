require "rails_helper"

RSpec.describe "Api::V1::Teams", type: :request do
  let!(:team) { create(:team) }

  describe "GET /teams/select" do
    it "チームの情報取得に成功すること" do
      get "/api/v1/teams/select"
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(team.to_json)
    end
  end

  describe "POST /teams" do
    let(:params) { attributes_for(:team) }
    let(:headers) { { "Content-Type" => "application/json" } }

    it "チームの新規作成に成功すること" do
      post "/api/v1/teams", params: params.to_json, headers: headers
      expect(response).to have_http_status(:created)
    end
  end

  describe "GET /teams/:id" do
    let!(:user) { create(:user, team_id: team.id) }

    it "チームに所属するユーザーの情報取得に成功すること" do
      get "/api/v1/teams/#{team.id}"
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(team.users.to_json)
    end
  end

  describe "PATCH /teams/:id" do
    let(:params) { { name: "team_update" } }
    let(:headers) { { "Content-Type" => "application/json" } }

    it "チームの情報更新に成功すること" do
      patch "/api/v1/teams/#{team.id}", params: params.to_json.to_s, headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /teams/:id" do
    it "チームの削除に成功すること" do
      delete "/api/v1/teams/#{team.id}"
      expect(response).to have_http_status(:ok)
    end
  end
end
