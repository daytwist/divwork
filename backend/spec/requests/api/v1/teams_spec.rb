require "rails_helper"

RSpec.describe "Api::V1::Teams", type: :request do
  let!(:team) { create(:team) }
  let(:json) { JSON.parse(response.body) }

  describe "GET /select" do
    it "チームの情報取得に成功すること" do
      get "/api/v1/teams/select"
      expect(response).to have_http_status(:ok)
      expect(json["teams"][-1]).to include("id" => team.id)
    end
  end

  describe "POST /" do
    let(:params) { attributes_for(:team) }
    let(:headers) { { "Content-Type" => "application/json" } }

    it "チームの新規作成に成功すること" do
      post "/api/v1/teams", params: params.to_json, headers: headers
      expect(response).to have_http_status(:created)
    end
  end

  describe "DELETE /:id" do
    it "チームの削除に成功すること" do
      delete "/api/v1/teams/#{team.id}"
      expect(response).to have_http_status(:ok)
    end
  end

  context "チームのユーザーがログインしている時" do
    let(:user) { create(:user, team:) }
    let(:headers) { user.create_new_auth_token }

    describe "GET /:id" do
      before do
        get "/api/v1/teams/#{team.id}", headers:
      end

      it "チームの情報取得に成功すること" do
        expect(response).to have_http_status(:ok)
        expect(json["team"]["id"]).to eq team.id
      end

      it "チームに所属するユーザーの情報取得に成功すること" do
        get "/api/v1/teams/#{team.id}", headers: headers
        expect(json["users"][0]).to include("id" => user.id)
      end
    end

    describe "PATCH /:id" do
      it "チームの情報更新に成功すること" do
        params = { name: "team_update" }
        headers["Content-Type"] = "application/json"
        patch "/api/v1/teams/#{team.id}", params: params.to_json, headers: headers

        expect(response).to have_http_status(:ok)
        expect(json["team"]["name"]).to eq params[:name]
      end
    end
  end

  context "別のチームのユーザーがログインしている時" do
    let(:another_team) { create(:team) }
    let(:another_user) { create(:user, team: another_team) }
    let(:headers) { another_user.create_new_auth_token }

    describe "ensure_correct_user" do
      it "他ユーザーのチームを参照しようとするとエラーが発生すること" do
        get "/api/v1/teams/#{team.id}", headers: headers
        expect(response).to have_http_status(:internal_server_error)
      end

      it "他ユーザーのタスクを更新しようとするとエラーが発生すること" do
        params = { name: "team_update2" }
        patch "/api/v1/teams/#{team.id}", params: params.to_json, headers: headers
        expect(response).to have_http_status(:internal_server_error)
      end
    end
  end
end
