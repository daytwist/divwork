require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let!(:task_a) { create(:task, user:) }
  let!(:task_b) { create(:task, user:) }
  let(:headers) { user.create_new_auth_token }

  describe "GET /" do
    it "ユーザーのタスク一覧表示に成功すること" do
      get "/api/v1/users/#{user.id}", headers: headers
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(task_a.to_json && task_b.to_json)
    end
  end
end
