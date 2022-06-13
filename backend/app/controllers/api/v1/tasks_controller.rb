class Api::V1::TasksController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_task, only: [:show, :update, :destroy, :ensure_correct_user]
  before_action :ensure_correct_user, only: [:update, :destroy]

  def create
    task = Task.new(task_params)
    if task.save
      render json: { task: }, status: :created
    else
      render json: { message: "Failed to create task" }, status: :internal_server_error
    end
  end

  def show
    render json: { task: @task }, status: :ok
  end

  def update
    if @task.update(task_params)
      render json: { task: @task }, status: :ok
    else
      render json: { message: "Failed to update task" }, status: :internal_server_error
    end
  end

  def destroy
    if @task.destroy
      render json: { task: @task }, status: :ok
    else
      render json: { message: "Failed to destroy task" }, status: :internal_server_error
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def ensure_correct_user
    if @task.user != current_api_v1_user
      render json: { message: "User is wrong" }, status: :internal_server_error
    end
  end

  def task_params
    params.require(:task).permit(:title, :content, :deadline, :priority, :is_done, :user_id)
  end
end
