class Api::V1::Auth::RegistrationsController < ApplicationController
  private

  def sign_up_params
    params.permit(:name, :email, :password)
  end
end
