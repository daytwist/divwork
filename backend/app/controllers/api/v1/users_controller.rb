class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :finished]

  def show
    tasks = @user.tasks
    render json: { tasks: }, status: :ok
  end

  def finished; end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
