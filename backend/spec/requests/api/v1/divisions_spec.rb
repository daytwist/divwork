require "rails_helper"

RSpec.describe "Api::V1::Divisions", type: :request do
  let(:team) { create(:team) }
  let(:user_a) { create(:user, team:) }
  let!(:user_b) { create(:user, team:) }
  let(:task) { create(:task, user: user_a) }
  let(:headers) { user_a.create_new_auth_token }
  let(:json) { JSON.parse(response.body) }

  before do
    headers.merge!("Content-Type" => "application/json")
  end

  describe "GET /new" do
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

    it "チームメンバーがuser_bであること" do
      expect(json["team_members"][0]["id"]).to eq user_b.id
    end
  end

  describe "POST /" do
    let(:task_params) { attributes_for(:task, user_id: user_b.id, parent_id: task.id) }
    let(:task_params_blank) { attributes_for(:task, parent_id: task.id) }
    let(:division_params) { attributes_for(:division) }

    it "user_aがuser_bにタスクを分担出来ること" do
      expect do
        post "/api/v1/tasks/#{task.id}/divisions",
             params: { task: task_params, division: division_params }.to_json,
             headers:
      end.to change { user_b.tasks.count }.by(1) &&
             change { user_a.divisions.count }.by(1)

      expect(response).to have_http_status(:ok)
    end

    it "コメントが登録されていること" do
      post "/api/v1/tasks/#{task.id}/divisions",
           params: { task: task_params, division: division_params }.to_json,
           headers: headers
      expect(json["division"]["comment"]).to eq division_params[:comment]
    end

    it "ユーザーを入力しないとエラーメッセージが返ってくること" do
      post "/api/v1/tasks/#{task.id}/divisions",
           params: { task: task_params_blank, division: division_params }.to_json,
           headers: headers

      binding.pry

      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"][0]).to eq "ユーザーを入力してください"
    end
  end

  describe "ensure_team_member" do
    let(:team_c) { create(:team) }
    let(:user_c) { create(:user, team: team_c) }
    let(:task_c) { create(:task, user: user_c) }
    let(:task_params_c) { attributes_for(:task, user_id: user_c.id, parent_id: task_c.id) }
    let(:division_params_c) { attributes_for(:division) }

    it "他チームのタスク分担ページにアクセス出来ないこと" do
      get "/api/v1/tasks/#{task_c.id}/divisions/new", headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end

    it "他チームのタスクを分担出来ないこと" do
      post "/api/v1/tasks/#{task_c.id}/divisions",
           params: { task: task_params_c, division: division_params_c }.to_json,
           headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end
  end
end
