class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def error_messages(obj)
    obj.errors.full_messages
  end

  def avatar_url(obj)
    if obj.avatar.attached?
      url_for(obj.avatar)
    else
      ""
    end
  end
end
