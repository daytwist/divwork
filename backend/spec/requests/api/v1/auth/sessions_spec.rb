require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let(:json) { JSON.parse(response.body) }

  describe "GET /index" do
    context "ユーザーがログインしていない時" do
      before do
        get "/api/v1/auth/sessions"
      end

      it "サインインフラグがfalseであること" do
        expect(response).to have_http_status(:ok)
        expect(json["is_signed_in"]).to be false
      end

      it "ログインユーザーが空欄であること" do
        expect(json["current_user"]).to eq ""
      end
    end

    context "ユーザーがログインしている時" do
      let(:team) { create(:team) }
      let(:user) { create(:user, team:) }
      let(:headers) { user.create_new_auth_token }

      before do
        get "/api/v1/auth/sessions", headers:
      end

      it "サインインフラグがtrueであること" do
        expect(response).to have_http_status(:ok)
        expect(json["is_signed_in"]).to be true
      end

      it "ログインユーザー情報を取得出来ること" do
        expect(json["current_user"]["id"]).to eq user.id
      end

      it "ログインユーザーのアバター情報を取得出来ること" do
        expect(json["current_user"]["avatar"]).to eq ""
      end
    end
  end

  describe "POST /guest_sign_in" do
    before do
      post "/api/v1/auth/guest_sign_in"
    end

    it "ゲストログインに成功すること" do
      expect(response).to have_http_status(:ok)
      expect(json["data"]["email"]).to eq "guest@example.com"
    end

    it "ヘッダーに必要な情報が格納されていること" do
      headers = response.headers
      expect(headers["access-token"]).to be_present
      expect(headers["client"]).to be_present
      expect(headers["uid"]).to eq "guest@example.com"
    end
  end
end
