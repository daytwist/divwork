require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team_id: team.id) }
  let(:headers) { user.create_new_auth_token }
  let(:json) { JSON.parse(response.body) }

  describe "POST /api/v1/auth" do
    it "ユーザー登録が成功すること" do
      params = attributes_for(:user, team_id: team.id)
      post "/api/v1/auth", params: params
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /api/v1/auth/sign_in" do
    it "ログインが成功すること" do
      params = { email: user.email, password: user.password }
      post "/api/v1/auth/sign_in", params: params
      expect(response).to have_http_status(:ok)
    end
  end

  describe "PATCH /api/v1/auth" do
    let(:params) { { name: "new_name", avatar: { data: "abc", filename: "blank.jpeg" } } }

    before do
      patch "/api/v1/auth", params:, headers:
    end

    it "名前の変更に成功すること" do
      expect(response).to have_http_status(:ok)
      expect(response.body).to include("new_name")
    end

    it "画像のアップロードに成功すること" do
      expect(user.avatar.attached?).to be true
    end
  end

  describe "PATCH /api/v1/auth/password" do
    it "パスワード変更が成功すること" do
      params = { password: "new_password", password_confirmation: "new_password" }
      patch "/api/v1/auth/password", params: params, headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    it "ログアウトが成功すること" do
      delete "/api/v1/auth/sign_out", headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "before_action :ensure_normal_user" do
    let(:guest_headers) do
      {
        "access-token" => response.headers["access-token"],
        "client" => response.headers["client"],
        "uid" => response.headers["uid"]
      }
    end

    before do
      post "/api/v1/auth/guest_sign_in"
    end

    it "ゲストユーザーは更新出来ないこと" do
      params = { "email" => "guest1@example.com" }
      patch "/api/v1/auth", headers: guest_headers, params: params
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "ゲストユーザーの更新・削除は出来ません"
    end

    it "ゲストユーザーは削除出来ないこと" do
      delete "/api/v1/auth", headers: guest_headers
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "ゲストユーザーの更新・削除は出来ません"
    end
  end

  describe "ensure_max_num_of_users" do
    let(:team_filled) { create(:team, max_num_of_users: 1) }
    let!(:user) { create(:user, team: team_filled) }
    let(:params) { attributes_for(:user, team_id: team_filled.id) }

    it "選択したチームが上限人数に達していた場合、エラーが発生すること" do
      post "/api/v1/auth", params: params
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "このチームは上限人数に達しています"
    end
  end
end
