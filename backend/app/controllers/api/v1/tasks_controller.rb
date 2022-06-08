class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy, :share]

  def create
    task = Task.new(params[:task])
    if task.save
      render json: { task: }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def show
    render json: { task: }, status: :ok
  end

  def update
    if @task.update(task_params)
      render json: { task: @task }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def destroy
    if @task.destroy
      render json: { task: @task }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def share; end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :content, :deadline, :priority, :is_done, :user_id)
  end
end
