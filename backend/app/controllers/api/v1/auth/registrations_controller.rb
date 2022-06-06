class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:name, :email, :password, :team_id)
  end

  def account_update_params
    params.permit(:name, :email, :password, :team_id, :avatar)
  end
end
