require "rails_helper"

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:team) { create(:team) }
  let!(:user) { create(:user, team:) }
  let(:task) { create(:task, user:) }
  let(:headers) { user.create_new_auth_token }
  let(:json) { JSON.parse(response.body) }

  before do
    headers["Content-Type"] = "application/json"
  end

  describe "POST /" do
    let(:params) { attributes_for(:task, user_id: user.id, files: fixture_file_upload("file.txt", "text/txt")) }
    let(:params_blank) { attributes_for(:task, title: "", user_id: user.id) }

    it "タスクの新規作成に成功すること" do
      expect do
        post "/api/v1/tasks", params: params.to_json, headers:
      end.to change { user.tasks.count }.by(1)
      expect(response).to have_http_status(:created)
    end

    it "タイトルが入力されていないとエラーメッセージが返ってくること" do
      post "/api/v1/tasks", params: params_blank.to_json, headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"][0]).to eq "タイトルを入力してください"
    end
  end

  describe "GET /:id" do
    let(:task) { create(:task, user:, parent_id: parent_task.id) }
    let(:user_a) { create(:user, team:) }
    let(:user_b) { create(:user, team:) }
    let(:parent_task) { create(:task, user: user_a) }
    let(:child_task) { create(:task, user: user_b, parent_id: task.id) }
    let!(:division_a) { create(:division, user:, task: child_task) }
    let!(:division_b) { create(:division, user: user_a, task:) }

    before do
      get "/api/v1/tasks/#{task.id}", headers:
    end

    it "タスクの情報取得に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(json["task"]["id"]).to eq task.id
    end

    it "タスクのユーザー情報を取得出来ること" do
      expect(json["user"]["id"]).to eq user.id
      expect(json["user"]["avatar"]).to eq ""
    end

    it "親タスク情報を取得出来ること" do
      expect(json["parent_task"]["id"]).to eq parent_task.id
      expect(json["parent_task"]["user"]["id"]).to eq user_a.id
    end

    it "子タスク情報を取得出来ること" do
      expect(json["children_tasks"][0]["id"]).to eq child_task.id
      expect(json["children_tasks"][0]["user"]["id"]).to eq user_b.id
    end

    it "子タスクの分担情報を取得出来ること" do
      expect(json["children_tasks"][0]["division"]["id"]).to eq division_a.id
      expect(json["children_tasks"][0]["division"]["user"]["id"]).to eq user.id
    end

    it "分担情報を取得出来ること" do
      expect(json["division"]["id"]).to eq division_b.id
      expect(json["division"]["user"]["id"]).to eq user_a.id
    end
  end

  describe "PATCH /:id" do
    let(:params) do
      attributes_for(:task, title: "task_update", user_id: user.id,
                            files: fixture_file_upload("file2.txt", "text/txt"))
    end
    let(:params_blank) { attributes_for(:task, title: "", user_id: user.id) }

    it "タスクの情報更新に成功すること" do
      patch "/api/v1/tasks/#{task.id}", params: params.to_json, headers: headers
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(params[:title])
    end

    it "タイトルが入力されていないとエラーメッセージが返ってくること" do
      patch "/api/v1/tasks/#{task.id}", params: params_blank.to_json, headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"][0]).to eq "タイトルを入力してください"
    end
  end

  describe "DELETE /:id" do
    it "タスクの削除に成功すること" do
      delete "/api/v1/tasks/#{task.id}", headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "ensure_team_member" do
    let(:team_c) { create(:team) }
    let(:user_c) { create(:user, team: team_c) }
    let(:task_c) { create(:task, user: user_c) }
    let(:params_c) { attributes_for(:task, user_id: user_c.id) }

    it "他チームのタスク詳細ページにアクセス出来ないこと" do
      get "/api/v1/tasks/#{task_c.id}", headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end

    it "他チームのユーザータスクを作成出来ないこと" do
      post "/api/v1/tasks", params: params_c.to_json, headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end
  end

  describe "ensure_correct_user" do
    let(:another_user) { create(:user, team:) }
    let(:another_task) { create(:task, user: another_user) }
    let(:params) { attributes_for(:task, title: "task_update2") }

    it "他ユーザーのタスクを更新しようとするとエラーが発生すること" do
      patch "/api/v1/tasks/#{another_task.id}", params: params.to_json, headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end

    it "他ユーザーのタスクを削除しようとするとエラーが発生すること" do
      delete "/api/v1/tasks/#{another_task.id}", headers: headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "アクセス権限がありません"
    end
  end
end
