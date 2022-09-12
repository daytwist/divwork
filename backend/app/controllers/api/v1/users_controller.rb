class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user

  def show
    user = @user.as_json.merge(avatar: avatar_url(@user))
    unfinished_tasks = @user.tasks.unfinished
    finished_tasks = @user.tasks.finished
    divisions = @user.divisions.as_json(methods: :details)
    render json: {
      user:, unfinished_tasks:, finished_tasks:, divisions:
    }, status: :ok
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
