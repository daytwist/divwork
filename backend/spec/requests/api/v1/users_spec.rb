require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let!(:unfinished_task) { create(:task, is_done: false, user:) }
  let!(:finished_task) { create(:task, is_done: true, user:) }
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

    it "ユーザーの未了タスクの情報取得に成功すること" do
      expect(json["unfinished_tasks"][0]["id"]).to eq unfinished_task.id
    end

    it "ユーザーの完了済みタスクの情報取得に成功すること" do
      expect(json["finished_tasks"][0]["id"]).to eq finished_task.id
    end
  end

  describe "GET /edit" do
    it "ユーザーの情報取得に成功すること" do
      get "/api/v1/users/#{user.id}/edit", headers: headers
      expect(response).to have_http_status(:ok)
      expect(json["user"]["id"]).to eq user.id
    end
  end
end
