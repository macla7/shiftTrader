class Api::V1::NotificationBlueprintsController < ApiController
  before_action :set_notification_blueprint, only: %i[ show edit update destroy ]

  include NotificationRecipients

  # GET /notification_blueprints or /notification_blueprints.json

  # POST /notification_blueprints or /notification_blueprints.json
  def create
    @notification_blueprint = NotificationBlueprint.new(notification_blueprint_params)
    respond_to do |format|
      if @notification_blueprint.save!
        format.json { render json: @notification_blueprint, status: :ok }
      else
        format.json { render json: @notification_blueprint.errors, status: :unprocessable_entity }
      end
    end
    getRecipients(notification_blueprint_params).each do |recipient|
      Notification.create(recipient_id: recipient.id, notification_blueprint_id: @notification_blueprint.id)
    end
    p current_user
    p 'MOOOOOOOONNGOOOOOO'
    current_user.notification_origins.create(notification_blueprint_id: @notification_blueprint.id)
    # need to create notificationOrigin and buda bing, shotty notification system done.
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification_blueprint
      @notification_blueprint = NotificationBlueprint.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def notification_blueprint_params
      params.require(:notification_blueprint).permit(
        :notificationable_type, :notificationable_id, :notification_type
      )
    end
end
