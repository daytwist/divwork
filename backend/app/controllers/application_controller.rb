class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def error_messages(resource)
    resource.errors.full_messages
  end

  def avatar_url(user)
    if user&.avatar&.attached?
      url_for(user.avatar)
    else
      ""
    end
  end
end
