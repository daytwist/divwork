require "rails_helper"

RSpec.describe "Api::V1::Auth::Passwords", type: :request do
  describe "before_action :ensure_normal_user" do
    let(:guest_headers) do
      {
        "access-token" => response.headers["access-token"],
        "client" => response.headers["client"],
        "uid" => response.headers["uid"]
      }
    end
    let(:json) { JSON.parse(response.body) }

    before do
      post "/api/v1/auth/guest_sign_in"
    end

    it "ゲストユーザーのパスワード変更は出来ないこと" do
      params = {
        "email" => "guest@example.com",
        "password" => "password",
        "password_confirmation" => "password"
      }
      put "/api/v1/auth/password", headers: guest_headers, params: params
      expect(response).to have_http_status(:internal_server_error)
      expect(json["message"]).to eq "ゲストユーザーのパスワード変更は出来ません"
    end
  end
end
