class Api::V1::DivisionsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def new
    task = Task.find(params[:task_id])
    new_task = task.dup
    new_task.parent = task
    team_members = task.user.team_members
    render json: { task: new_task, team_members: }, status: :ok
  end

  def create
    new_task = Task.new(task_params)
    new_task.save!

    division = Division.new(
      user_id: current_api_v1_user.id,
      task_id: new_task.id,
      comment: division_params[:comment]
    )
    division.save!

    render json: { task: new_task, division: }, status: :ok
  rescue StandardError => e
    render json: { error: e, message: "Failed to divide task" }, status: :internal_server_error
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :deadline, :priority, :is_done, :user_id, :parent_id, files: [])
  end

  def division_params
    params.require(:division).permit(:comment)
  end
end
