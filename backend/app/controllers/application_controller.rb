class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def error_messages(obj)
    obj.errors.full_messages
  end
end
