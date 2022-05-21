# Usually comes with default app if you use --api flag..
# which we didn't hear.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '/api/v1/*', headers: :any, methods: %i[get post patch put delete]
  end
end
