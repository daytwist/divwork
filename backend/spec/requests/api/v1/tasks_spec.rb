require "rails_helper"

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let(:task) { create(:task, user:) }
  let(:headers) { { "Content-Type" => "application/json" } }

  context "ユーザーがログインしている時" do
    before do
      headers.merge!(user.create_new_auth_token)
    end

    describe "POST /" do
      let(:params) { attributes_for(:task, user_id: user.id) }

      it "タスクの新規作成に成功すること" do
        post "/api/v1/users/#{user.id}/tasks", params: params.to_json, headers: headers
        expect(response).to have_http_status(:created)
      end
    end

    describe "GET /:id" do
      it "タスクの情報取得に成功すること" do
        get "/api/v1/users/#{user.id}/tasks/#{task.id}", headers: headers
        expect(response).to have_http_status(:ok)
        expect(response.body).to include(task.to_json)
      end
    end

    describe "PATCH /:id" do
      let(:params) { attributes_for(:task, title: "task_update", user_id: user.id) }

      it "タスクの情報更新に成功すること" do
        patch "/api/v1/users/#{user.id}/tasks/#{task.id}", params: params.to_json, headers: headers
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("task_update")
      end
    end

    describe "DELETE /:id" do
      it "タスクの削除に成功すること" do
        delete "/api/v1/users/#{user.id}/tasks/#{task.id}", headers: headers
        expect(response).to have_http_status(:ok)
      end
    end
  end

  context "別のユーザーがログインしている時" do
    let(:another_user) { create(:user, team:) }
    let(:params) { attributes_for(:task, title: "task_update2", user_id: user.id) }

    before do
      headers.merge!(another_user.create_new_auth_token)
    end

    describe "ensure_correct_user" do
      it "他ユーザーのタスクを更新しようとするとエラーが発生すること" do
        patch "/api/v1/users/#{user.id}/tasks/#{task.id}", params: params.to_json, headers: headers
        expect(response).to have_http_status(:internal_server_error)
      end

      it "他ユーザーのタスクを削除しようとするとエラーが発生すること" do
        delete "/api/v1/users/#{user.id}/tasks/#{task.id}", headers: headers
        expect(response).to have_http_status(:internal_server_error)
      end
    end
  end
end
