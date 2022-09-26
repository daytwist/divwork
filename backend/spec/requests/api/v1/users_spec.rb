require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let(:unfinished_task) { create(:task, is_done: false, user:, parent_id: finished_task.id) }
  let(:finished_task) { create(:task, is_done: true, user:) }
  let!(:division) { create(:division, user:, task: unfinished_task) }
  let(:headers) { user.create_new_auth_token }
  let(:json) { JSON.parse(response.body) }

  describe "GET /" do
    before do
      get "/api/v1/users/#{user.id}", headers:
    end

    it "ユーザーの情報取得に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(json["user"]["id"]).to eq user.id
    end

    it "ユーザーのアバター情報を取得出来ること" do
      expect(json["user"]["avatar"]).to eq ""
    end

    it "ユーザーの未了タスクを取得出来ること" do
      expect(json["unfinished_tasks"][0]["id"]).to eq unfinished_task.id
    end

    it "ユーザーの完了済みタスクを取得出来ること" do
      expect(json["finished_tasks"][0]["id"]).to eq finished_task.id
    end

    it "ユーザーの分担履歴を取得出来ること" do
      expect(json["divisions"][0]["id"]).to eq division.id
    end
  end

  describe "GET /edit" do
    it "ユーザーの情報取得に成功すること" do
      get "/api/v1/users/#{user.id}/edit", headers: headers
      expect(response).to have_http_status(:ok)
      expect(json["user"]["id"]).to eq user.id
    end
  end

  describe "ensure_team_member" do
    let(:another_team) { create(:team) }
    let(:another_user) { create(:user, team: another_team) }

    it "他チームのユーザーページにアクセス出来ないこと" do
      get "/api/v1/users/#{another_user.id}", headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end
  end

  describe "ensure_correct_user" do
    let(:user_b) { create(:user, team:) }

    it "他ユーザーの編集ページにアクセス出来ないこと" do
      get "/api/v1/users/#{user_b.id}/edit", headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end
  end
end
