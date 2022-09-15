class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user

  def show
    user = @user.as_json.merge(avatar: avatar_url(@user))
    unfinished_tasks = @user.tasks.unfinished.order(deadline: "ASC")
    finished_tasks = @user.tasks.finished.order(updated_at: "DESC")
    divisions = @user.divisions.includes(task: [user: :avatar_attachment])
                     .order(created_at: "DESC")
                     .map do |division|
      division.as_json(
        methods: [:parent_task, :parent_user, :child_task, :child_user]
      ).merge({ parent_user_avatar: avatar_url(division.parent_user) },
              { child_user_avatar: avatar_url(division.child_user) })
    end

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
