class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_normal_user, only: [:destroy]

  private

  def sign_up_params
    params.permit(:name, :email, :password, :team_id)
  end

  def account_update_params
    params.permit(:name, :email, :password, :team_id, :avatar)
  end

  def ensure_normal_user
    if @resource.email == "guest@example.com"
      render json: { message: "ゲストユーザーは削除出来ません" }, status: :internal_server_error
    end
  end
end
