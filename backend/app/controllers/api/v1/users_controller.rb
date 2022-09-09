class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user

  def show
    user = @user.as_json.merge(avatar: avatar_url(@user))
    unfinished_tasks = @user.tasks.unfinished
    finished_tasks = @user.tasks.finished
    render json: { user:, unfinished_tasks:, finished_tasks: }, status: :ok
  end

  def finished
    user = @user.as_json.merge(avatar: avatar_url(@user))
    tasks = @user.tasks.finished
    render json: { user:, tasks: }, status: :ok
  end

  def edit
    user = @user.as_json.merge(avatar: avatar_url(@user))
    render json: { user: }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
