class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_normal_user, only: [:update, :destroy]

  def update
    if @resource
      if params[:avatar][:data].present?
        blob = ActiveStorage::Blob.create_after_upload!(
          io: StringIO.new("#{decode(params[:avatar][:data])}\n"),
          filename: params[:avatar][:filename]
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

  private

  def sign_up_params
    params.permit(:name, :email, :password, :team_id)
  end

  def account_update_params
    params.permit(:name, :email, :password, :team_id, :avatar)
  end

  def ensure_normal_user
    if @resource.email == "guest@example.com"
      render json: { messages: "ゲストユーザーの更新・削除は出来ません" }, status: :internal_server_error
    end
  end

  def decode(str)
    Base64.decode64(str.split(",").last)
  end
end
