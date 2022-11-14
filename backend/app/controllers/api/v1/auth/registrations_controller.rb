class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_normal_user, only: [:update, :destroy]
  before_action :ensure_max_num_of_users, only: [:create]

  def update
    if @resource
      if params[:avatar] && params[:avatar][:data].present?
        blob = ActiveStorage::Blob.create_after_upload!(
          io: StringIO.new("#{decode(params[:avatar][:data].split(',')[1])}\n"),
          filename: params[:avatar][:filename],
          content_type: "image/png"
        )
        @resource.avatar.attach(blob)
      end
      if @resource.send(resource_update_method, account_update_params)
        yield @resource if block_given?
        render_update_success
      else
        render_update_error
      end
    else
      render_update_error_user_not_found
    end
  end

  protected

  def render_update_success
    data = resource_data.as_json.merge(avatar: avatar_url(@resource))
    render json: {
      status: "success",
      data:
    }
  end

  private

  def sign_up_params
    params.permit(:name, :email, :password, :team_id, :admin)
  end

  def account_update_params
    params.permit(:name, :email, :password, :team_id, :admin, :avatar)
  end

  def decode(str)
    Base64.decode64(str.split(",").last)
  end

  def ensure_normal_user
    if @resource.email == "guest@example.com"
      render json: { messages: "ゲストユーザーの更新・削除は出来ません" }, status: :internal_server_error
    end
  end

  def ensure_max_num_of_users
    team = Team.find(params["team_id"])
    if team.users.size == team.max_num_of_users
      render json: { messages: "このチームは上限人数に達しています" },
             status: :internal_server_error
    end
  end
end
