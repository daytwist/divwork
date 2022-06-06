require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  let(:team) { create(:team) }
  let(:user) { create(:user, team_id: team.id) }
  let(:headers) { user.create_new_auth_token }

  describe "POST /api/v1/auth" do
    let(:params) { attributes_for(:user, team_id: team.id) }

    it "ユーザー登録が成功すること" do
      post "/api/v1/auth", params: params
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /api/v1/auth/sign_in" do
    let(:params) { { email: user.email, password: user.password } }

    it "ログインが成功すること" do
      post "/api/v1/auth/sign_in", params: params
      expect(response).to have_http_status(:ok)
    end
  end

  describe "PUT /api/v1/auth/password" do
    let(:params) { { password: "new_password", password_confirmation: "new_password" } }

    it "パスワード変更が成功すること" do
      put "/api/v1/auth/password", params: params, headers: headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    it "ログアウトが成功すること" do
      delete "/api/v1/auth/sign_out", headers: headers
      expect(response).to have_http_status(:ok)
    end
  end
end
