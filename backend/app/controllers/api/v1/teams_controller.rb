class Api::V1::TeamsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:show, :update]
  before_action :set_team, only: [:show, :update, :destroy, :ensure_team_member]
  before_action :ensure_team_member, only: [:show, :update]
  before_action :ensure_admin_user, only: [:update, :destroy]

  def select
    teams = []

    Team.all.find_each do |team|
      if team.max_num_of_users > team.users_count
        teams << team
      end
    end

    render json: { teams: }, status: :ok
  end

  def create
    team = Team.new(team_params)
    if team.save
      render json: { team: }, status: :created
    else
      render json: { messages: error_messages(team) }, status: :internal_server_error
    end
  end

  def show
    users = @team.users.includes(:avatar_attachment)
    users = users.map do |user|
      user.as_json(methods: [:unfinished_tasks_priority_count, :unfinished_tasks_deadline_count])
          .merge(avatar: avatar_url(user))
    end

    render json: { team: @team, users: }, status: :ok
  end

  def update
    if @team.update(team_params)
      render json: { team: @team }, status: :ok
    else
      render json: { messages: error_messages(@team) }, status: :internal_server_error
    end
  end

  def destroy
    if @team.destroy
      render json: { team: @team }, status: :ok
    else
      render json: { messages: error_messages(@team) }, status: :internal_server_error
    end
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name, :max_num_of_users)
  end

  def ensure_team_member
    if @team.users.exclude? current_api_v1_user
      render json: { messages: "アクセス権限がありません" }, status: :internal_server_error
    end
  end

  def ensure_admin_user
    if @team.admin_users.exclude? current_api_v1_user
      render json: { messages: "管理者権限が必要です" }, status: :internal_server_error
    end
  end
end
