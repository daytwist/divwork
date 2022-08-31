class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: [:show]

  def show
    unfinished_tasks = @user.tasks.unfinished
    finished_tasks = @user.tasks.finished

    avatar_url = if @user.avatar.attached?
                   url_for(@user.avatar)
                 else
                   ""
                 end

    render json: {
      user: @user, unfinished_tasks:, finished_tasks:, avatar: avatar_url
    }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
