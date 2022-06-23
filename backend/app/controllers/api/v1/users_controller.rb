class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: [:show, :finished]

  def show
    tasks = @user.tasks.unfinished
    render json: { user: @user, tasks: }, status: :ok
  end

  def finished
    tasks = @user.tasks.finished
    render json: { tasks: }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
