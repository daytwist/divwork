class Api::V1::TeamsController < ApplicationController
  before_action :authenticate_api_v1_user!, except: [:select, :create, :destroy]
  before_action :set_team, only: [:show, :update, :destroy, :ensure_correct_user]
  before_action :ensure_correct_user, except: [:select, :create, :destroy]

  def select
    teams = Team.all
    render json: { teams: }, status: :ok
  end

  def create
    team = Team.new(team_params)
    if team.save
      render json: { team: }, status: :created
    else
      render json: { message: "Failed to create team" }, status: :internal_server_error
    end
  end

  def show
    users = @team.users
    render json: { team: @team, users: users.as_json(methods: :tasks_count) },
           status: :ok
  end

  def update
    if @team.update(team_params)
      render json: { team: @team }, status: :ok
    else
      render json: { message: "Failed to update team" }, status: :internal_server_error
    end
  end

  def destroy
    if @team.destroy
      render json: { team: @team }, status: :ok
    else
      render json: { message: "Failed to destroy team" }, status: :internal_server_error
    end
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def ensure_correct_user
    if @team.users.exclude? current_api_v1_user
      render json: { message: "User is wrong" }, status: :internal_server_error
    end
  end

  def team_params
    params.require(:team).permit(:name)
  end
end
