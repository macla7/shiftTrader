class TokensController < Doorkeeper::TokensController
  def create
    p 'ANYONE OUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUT THERE'
    p authorize_response.body

    headers.merge!(authorize_response.headers)
    render json: authorize_response.body,
          status: authorize_response.status
  rescue Errors::DoorkeeperError => e
    handle_token_exception(e)
  end
end
