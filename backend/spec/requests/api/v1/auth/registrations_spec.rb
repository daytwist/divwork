require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  let(:params) { attributes_for(:user) }

  it "ユーザー登録出来ること" do
    post "/api/v1/auth", params: params
    expect(response).to have_http_status(200)
  end
end
