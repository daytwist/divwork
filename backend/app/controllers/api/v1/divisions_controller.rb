class Api::V1::DivisionsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def new
    task = Task.find(params[:task_id])
    new_task = task.dup
    new_task.parent = task
    render json: { task: new_task }, status: :ok
  end

  def create
    new_task = Task.new(task_params)
    new_task.save!

    division = Division.new(user_id: current_api_v1_user.id, task_id: new_task.id)
    division.save!

    render json: { task: new_task, division: }, status: :ok
  rescue StandardError => e
    render json: { error: e, message: "Failed to divide task" }, status: :internal_server_error
  end

  private

  def task_params
    params.permit(:title, :content, :deadline, :priority, :is_done, :user_id, :parent_id)
  end
end
