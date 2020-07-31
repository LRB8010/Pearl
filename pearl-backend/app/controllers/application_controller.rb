class ApplicationController < ActionController::API
    before_action :logged_in?
    def encode_token(payload)
        JWT.encode(payload, "se042020")
    end

    def logged_in?
        # byebug

        headers = request.headers["Authorization"]
        token = headers.split(" ")[1]

        begin
            @user_id = JWT.decode(token, "se042020")[0]["user_id"]
            @userr = User.find(@user_id)
        rescue 
            @userr = nil
        # ensure
            #always runs with an error or without
        end

        render json: {error: "Please LogIn"} unless @userr
    end

    def current_user
        @userr
      end
end
