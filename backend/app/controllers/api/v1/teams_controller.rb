class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update, :destroy]

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
    render json: { users: }, status: :ok
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

  def team_params
    params.require(:team).permit(:name)
  end
end
