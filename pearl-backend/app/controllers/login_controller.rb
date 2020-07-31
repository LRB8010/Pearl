class LoginController < ApplicationController
    skip_before_action :logged_in?

    def create
        
        user = User.find_by(username: params[:user][:username])
        
        if user && user.authenticate(params[:user][:password])
            render json: {username: user.username, token: encode_token({user_id: user.id}) }
        else
            render json: {error: "invalid username or password"}
        end
    end

end