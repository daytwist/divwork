require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let!(:unfinished_task) { create(:task, is_done: false, user:) }
  let!(:finished_task) { create(:task, is_done: true, user:) }
  let(:headers) { user.create_new_auth_token }

  describe "GET /" do
    before do
      get "/api/v1/users/#{user.id}", headers:
    end

    it "ユーザーの未了タスクの情報取得に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(unfinished_task.to_json)
    end

    it "完了済みタスクが含まれていないこと" do
      expect(response.body).not_to include(finished_task.to_json)
    end
  end

  describe "GET /finished" do
    before do
      get "/api/v1/users/#{user.id}/finished", headers:
    end

    it "ユーザーの完了済みタスクの情報取得に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(finished_task.to_json)
    end

    it "未了のタスクが含まれていないこと" do
      expect(response.body).not_to include(unfinished_task.to_json)
    end
  end
end
