class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_normal_user, only: [:create, :update]

  protected

  def render_update_success
    data = resource_data.as_json.merge(avatar: avatar_url(@resource))
    render json: {
      success: true,
      data:,
      message: I18n.t("devise_token_auth.passwords.successfully_updated")
    }
  end

  private

  def ensure_normal_user
    if params[:email] == "guest@example.com"
      render json: { messages: "ゲストユーザーのパスワード変更は出来ません" }, status: :internal_server_error
    end
  end
end
