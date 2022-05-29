class MembersController < ApplicationController

  def show
    user = get_user_from_token
    render json: {
      message: "If you see this, you're in, my good friend.",
      user: user
    }
  end

  private
  
  def get_user_from_token
    p request.headers['Authorization'].split(' ')[1]
    p "BIIIIIIIIIINNNNGGG"
    p Rails.application.credentials.devise[:jwt_secret_key]
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                            Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end