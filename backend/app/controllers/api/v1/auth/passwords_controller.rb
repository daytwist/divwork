class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_normal_user, only: [:create, :update]

  private

  def ensure_normal_user
    if params[:email] == "guest@example.com"
      render json: { messages: "ゲストユーザーのパスワード変更は出来ません" }, status: :internal_server_error
    end
  end
end
