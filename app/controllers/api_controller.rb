class ApiController < ApplicationController
  include JsonWebToken

  before_action :decode_authorization_header
  before_action :doorkeeper_authorize!

  skip_before_action :verify_authenticity_token

  respond_to :json

  private

  def current_user
    p 'in api CONTROLLER ----> door keeper toooooken'
    return unless doorkeeper_token
    @current_user ||= User.find_by(id: doorkeeper_token[:resource_owner_id])
  end

  def decode_authorization_header
    if request.headers['Authorization']
      p request.headers['Authorization']
      request.headers['Authorization'] = "Bearer #{jwt_decode(request.headers['Authorization'])}"
      p request.headers['Authorization']
    end
  end
end