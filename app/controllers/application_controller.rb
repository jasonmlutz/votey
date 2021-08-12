class ApplicationController < ActionController::Base
  helper_method :current_user
  # before_action :bypass_login

  protect_from_forgery with: :null_session

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
  end
end
