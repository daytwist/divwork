class Api::V1::TasksController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_task, only: [:show, :update, :destroy]
  before_action :ensure_team_member, only: [:create, :show]
  before_action :ensure_correct_user, only: [:update, :destroy]

  def create
    task = Task.new(task_params)
    if task.save
      render json: { task: }, status: :created
    else
      render json: { messages: error_messages(task) }, status: :internal_server_error
    end
  end

  def show
    user = @task.user.as_json.merge(avatar: avatar_url(@task.user))

    parent_task = @task.parent
    if parent_task.present?
      parent_task = parent_task.as_json(include: :user).merge(avatar: avatar_url(parent_task.user))
    end

    children_tasks = @task.children.includes([{ user: :avatar_attachment }, { division: { user: :avatar_attachment } }])
                          .map do |child|
      child.as_json(include: [:user, { division: { include: :user } }])
           .merge(avatar: avatar_url(child.user), division_avatar: avatar_url(child.division.user))
    end

    division = @task.division
    if division.present?
      division = division.as_json(include: :user).merge(avatar: avatar_url(division.user))
    end

    render json: { task: @task, user:, parent_task:, children_tasks:, division: },
           status: :ok
  end

  def update
    if @task.update(task_params)
      render json: { task: @task }, status: :ok
    else
      render json: { messages: error_messages(@task) }, status: :internal_server_error
    end
  end

  def destroy
    if @task.destroy
      render json: { task: @task }, status: :ok
    else
      render json: { messages: error_messages(@task) }, status: :internal_server_error
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :title, :description, :deadline, :priority, :is_done, :rate_of_progress, :user_id, files: []
    )
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def ensure_team_member
    if task_params && (User.find(task_params[:user_id]).team.users.exclude? current_api_v1_user)
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end

    if @task && (@task.user.team.users.exclude? current_api_v1_user)
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end
  end

  def ensure_correct_user
    if @task.user != current_api_v1_user
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end
  end
end
