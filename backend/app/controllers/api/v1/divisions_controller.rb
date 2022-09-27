class Api::V1::DivisionsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_task, only: [:new]
  before_action :ensure_team_member, only: [:new, :create]

  def new
    new_task = @task.dup
    new_task.parent = @task
    team_members = @task.user.team_members
    render json: { task: new_task, team_members: }, status: :ok
  end

  def create
    task = Task.new(task_params)
    task.save!

    division = Division.new(
      user_id: current_api_v1_user.id,
      task_id: task.id,
      comment: division_params[:comment]
    )
    division.save!

    render json: { task:, division: }, status: :ok
  rescue StandardError => e
    render json: { error: e }, status: :internal_server_error
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :deadline, :priority, :is_done, :user_id, :parent_id, files: [])
  end

  def division_params
    params.require(:division).permit(:comment)
  end

  def set_task
    @task = Task.find(params[:task_id])
  end

  def ensure_team_member
    if params[:task].present? && params[:task][:user_id].present? &&
       (User.find(task_params[:user_id]).team.users.exclude? current_api_v1_user)
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end

    if @task && (@task.user.team.users.exclude? current_api_v1_user)
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end
  end
end
