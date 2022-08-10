class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_normal_user, only: [:create, :update]

  private

  def ensure_normal_user
    if params[:email].casecmp("guest@example.com").zero?
      render json: { message: "ゲストユーザーのパスワード変更は出来ません" }, status: :internal_server_error
    end
  end
end
