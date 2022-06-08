require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let!(:unfinished_task) { create(:task, is_done: false, user:) }
  let!(:finished_task) { create(:task, is_done: true, user:) }
  let(:headers) { user.create_new_auth_token }

  describe "GET /" do
    it "ユーザーのタスク一覧表示に成功すること" do
      get "/api/v1/users/#{user.id}", headers: headers
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(unfinished_task.to_json && finished_task.to_json)
    end
  end

  describe "GET /finished" do
    before do
      get "/api/v1/users/#{user.id}/finished", headers: headers
    end

    it "ユーザーの完了済みタスク表示に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(finished_task.to_json)
    end

    it "未了のタスクが表示されていないこと" do
      expect(response.body).not_to include(unfinished_task.to_json)
    end
  end
end
