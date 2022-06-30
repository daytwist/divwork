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
end
