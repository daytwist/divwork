require "rails_helper"

RSpec.describe "Api::V1::Divisions", type: :request do
  let(:team) { create(:team) }
  let(:user_a) { create(:user, team:) }
  let(:task) { create(:task, user: user_a) }
  let(:headers) { user_a.create_new_auth_token }

  describe "GET /new" do
    let(:json) { JSON.parse(response.body) }

    before do
      get "/api/v1/tasks/#{task.id}/divisions/new", headers:
    end

    it "タスク内容をコピー出来ること" do
      expect(response).to have_http_status(:ok)
      expect(json["task"]["title"]).to eq task.title
    end

    it "元のタスクIDが紐付いていること" do
      expect(json["task"]["parent_id"]).to eq task.id
    end
  end

  describe "POST /" do
    let(:user_b) { create(:user, team:) }
    let(:params) { attributes_for(:task, user_id: user_b.id, parent_id: task.id) }

    before do
      headers.merge!("Content-Type" => "application/json")
    end

    it "user_aがuser_bにタスクを分担出来ること" do
      expect do
        post "/api/v1/tasks/#{task.id}/divisions", params: params.to_json, headers:
      end.to change { user_b.tasks.count }.by(1) &&
             change { user_a.divisions.count }.by(1)

      expect(response).to have_http_status(:ok)
    end
  end
end
