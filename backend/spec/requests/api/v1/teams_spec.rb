require "rails_helper"

RSpec.describe "Api::V1::Teams", type: :request do
  let!(:team) { create(:team) }
  let(:json) { JSON.parse(response.body) }

  describe "GET /select" do
    it "チームの情報取得に成功すること" do
      get "/api/v1/teams/select"
      expect(response).to have_http_status(:ok)
      expect(json["teams"][-1]["id"]).to eq team.id
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

  context "チームの管理者ユーザーがログインしている時" do
    let(:user_admin) { create(:user, team:, admin: true) }
    let!(:task) { create(:task, user: user_admin, priority: 0, deadline: Time.zone.today.advance(days: 5)) }
    let(:headers) { user_admin.create_new_auth_token }

    describe "GET /:id" do
      before do
        get "/api/v1/teams/#{team.id}", headers:
      end

      it "チームの情報取得に成功すること" do
        expect(response).to have_http_status(:ok)
        expect(json["team"]["id"]).to eq team.id
      end

      it "チームに所属するユーザーの情報を取得出来ること" do
        expect(json["users"][0]["id"]).to eq user_admin.id
      end

      it "ユーザーの未完了タスク数を優先度毎に取得出来ること" do
        expect(json["users"][0]["unfinished_tasks_priority_count"]).to eq [1, 0, 0]
      end

      it "ユーザーの未完了タスク数を納期毎に取得出来ること" do
        expect(json["users"][0]["unfinished_tasks_deadline_count"]).to eq [0, 1, 0]
      end

      it "ユーザーのアバター情報が含まれること" do
        expect(json["users"][0]["avatar"]).to eq ""
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

  describe "ensure_admin_user" do
    let(:user_normal) { create(:user, team:) }
    let(:headers) { user_normal.create_new_auth_token }

    it "一般ユーザーがチームの情報更新しようとするとエラーが発生すること" do
      params = { name: "team_update" }
      headers["Content-Type"] = "application/json"
      patch "/api/v1/teams/#{team.id}", params: params.to_json, headers: headers

      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "管理者権限が必要です"
    end
  end

  describe "ensure_correct_user" do
    let(:another_team) { create(:team) }
    let(:another_user) { create(:user, team: another_team) }
    let(:headers) { another_user.create_new_auth_token }

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
