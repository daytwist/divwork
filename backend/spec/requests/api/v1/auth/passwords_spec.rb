require "rails_helper"

RSpec.describe "Api::V1::Auth::Passwords", type: :request do
  let(:json) { JSON.parse(response.body) }

  describe "PATCH /password" do
    let(:team) { create(:team) }
    let(:user) { create(:user, team_id: team.id) }
    let(:headers) { user.create_new_auth_token }
    let(:params) { { password: "new_password", password_confirmation: "new_password" } }

    it "レスポンスデータにアバター情報が含まれていること" do
      patch "/api/v1/auth/password", headers: headers, params: params
      expect(response).to have_http_status(:ok)
      expect(json["data"]["avatar"]).to eq ""
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

    it "ゲストユーザーのパスワード変更は出来ないこと" do
      params = {
        "email" => "guest@example.com",
        "password" => "password",
        "password_confirmation" => "password"
      }
      patch "/api/v1/auth/password", headers: guest_headers, params: params
      expect(response).to have_http_status(:internal_server_error)
      expect(json["messages"]).to eq "ゲストユーザーのパスワード変更は出来ません"
    end
  end
end
