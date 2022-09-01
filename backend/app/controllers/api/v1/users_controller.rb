class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: [:show]

  def show
    unfinished_tasks = @user.tasks.unfinished
    finished_tasks = @user.tasks.finished
    @user = @user.as_json.merge(avatar: avatar_url(@user))

    render json: { user: @user, unfinished_tasks:, finished_tasks: }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
