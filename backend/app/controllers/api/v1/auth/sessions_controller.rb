class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user.present?
      render json: { is_signed_in: true, current_user: current_api_v1_user },
             status: :ok
    else
      render json: { is_signed_in: false, current_user: "" },
             status: :ok
    end
  end

  def guest_sign_in
    user = User.guest
    sign_in user
    render json: { user: }, status: :ok
  end
end
