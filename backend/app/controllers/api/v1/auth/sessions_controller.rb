class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def index
    if current_api_v1_user.present?
      user = current_api_v1_user
      user = user.as_json.merge(avatar: avatar_url(user))

      render json: { is_signed_in: true, current_user: user },
             status: :ok
    else
      render json: { is_signed_in: false, current_user: "" },
             status: :ok
    end
  end

  def guest_sign_in
    @resource = User.guest
    @token = @resource.create_token
    @resource.save!
    render_create_success
  end
end
