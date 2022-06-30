require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe "GET /index" do
    let(:json) { JSON.parse(response.body) }

    context "ユーザーがログインしていない時" do
      it "サインインフラグがfalseであること" do
        get "/api/v1/auth/sessions"
        expect(response).to have_http_status(:ok)
        expect(json["is_signed_in"]).to be false
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

      it "サインインユーザー情報を取得出来ること" do
        expect(json["current_user"]).to eq user.as_json
      end
    end
  end
end
