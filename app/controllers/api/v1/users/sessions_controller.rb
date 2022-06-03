# app/controllers/members_controller.rb
module Api
  module V1
    module Users
      class SessionsController < ApiController
        include JsonWebToken

        def show
          # decoding and doorkeeper token should be handled already in
          # API controller

          # apears the issue is with jwt token decode according to rails s logs
          p current_user
          p 'BUDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
          render json: {
            message: "If you see this, you're in!",
            user: current_user
          }
        end
      end
    end
  end
end